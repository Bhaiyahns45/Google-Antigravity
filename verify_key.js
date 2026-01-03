require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function verify() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("❌ Error: GEMINI_API_KEY is missing in .env file.");
        return;
    }

    console.log(`🔑 Found API Key: ${key.substring(0, 5)}... (length: ${key.length})`);

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    try {
        console.log("📡 Testing connection to Gemini API...");
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("✅ Success! API responded:", response.text());
    } catch (error) {
        console.error("❌ API Error:");
        console.error(error);

        if (error.message.includes("403")) {
            console.log("\n💡 Tip: A 403 Forbidden error usually means:");
            console.log("1. The API key is invalid.");
            console.log("2. The 'Generative Language API' is not enabled in your Google Cloud Console.");
            console.log("3. You might be in a region where the API is not available.");
        }
    }
}

verify();
