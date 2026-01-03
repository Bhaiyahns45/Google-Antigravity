require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Agent System Instructions
const AGENTS = {
    CREATIVE: {
        name: "Creative Agent",
        role: "creative",
        instruction: "You are a Creative Agent. Your goal is to inspire, create art, write poetry, and generate innovative ideas. You speak in a flowery, artistic, and expressive manner. Use metaphors and vivid imagery."
    },
    TECH: {
        name: "Tech Agent",
        role: "tech",
        instruction: "You are a Tech Agent. Your goal is to solve technical problems, write code, debug, and explain complex engineering concepts. You speak in a precise, logical, and concise manner. You love efficiency and clean code."
    },
    GENERAL: {
        name: "Generalist Agent",
        role: "general",
        instruction: "You are a Generalist Agent. Your goal is to be a helpful assistant for everyday queries, general knowledge, and casual conversation. You are polite, friendly, and versatile."
    }
};

// Router Agent Logic
async function routeQuery(query) {
    const prompt = `
    You are a Router Agent. Your job is to analyze the user's query and route it to the most appropriate sub-agent.
    
    The available agents are:
    1. "creative": For storytelling, poetry, art, and creative writing.
    2. "tech": For coding, programming, debugging, and technical explanations.
    3. "general": For general knowledge, greetings, and anything that doesn't fit the other two.

    Analyze the following query and return ONLY the name of the agent (creative, tech, or general) that should handle it. Do not return any other text.

    Query: "${query}"
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim().toLowerCase();

        if (text.includes("creative")) return AGENTS.CREATIVE;
        if (text.includes("tech")) return AGENTS.TECH;
        return AGENTS.GENERAL;
    } catch (error) {
        console.error("Routing error:", error);
        return AGENTS.GENERAL; // Fallback
    }
}

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // 1. Route the query
        const selectedAgent = await routeQuery(message);
        console.log(`Routing "${message}" to ${selectedAgent.name}`);

        // 2. Generate response using the selected agent
        const agentModel = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: selectedAgent.instruction
        });

        const result = await agentModel.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({
            response: text,
            agent: selectedAgent.name,
            role: selectedAgent.role
        });

    } catch (error) {
        console.error("Error processing chat:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
