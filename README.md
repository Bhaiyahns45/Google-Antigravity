# Google Antigravity - Agentic AI System

**Google Antigravity** is a multi-agent AI application powered by Google's Gemini model. It demonstrates the power of agentic workflows by using a **Router Agent** to intelligently direct user queries to specialized sub-agents.

## 🌌 Features

-   **Multi-Agent Architecture**:
    -   **Router Agent**: Analyzes intent and routes queries.
    -   **Creative Agent**: Specializes in poetry, storytelling, and abstract ideas.
    -   **Tech Agent**: Expert in code, debugging, and technical explanations.
    -   **Generalist Agent**: Handles casual conversation and general knowledge.
-   **Premium UI**: A "gravity-defying" interface with glassmorphism, neon accents, and smooth animations.
-   **Powered by Gemini**: Utilizes `gemini-2.5-flash` for fast and accurate responses.

## 🚀 Getting Started

### Prerequisites

-   Node.js installed.
-   A Google Gemini API Key.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Bhaiyahns45/Google-Antigravity.git
    cd Google-Antigravity
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    -   Rename `.env.example` to `.env`.
    -   Add your API key:
        ```env
        GEMINI_API_KEY=your_api_key_here
        ```

4.  **Run the Application**:
    ```bash
    node server.js
    ```

5.  **Open in Browser**:
    Visit `http://localhost:3000` to interact with the agents.

## 🧠 How It Works

1.  **User Input**: You send a message via the chat interface.
2.  **Routing**: The backend sends your message to the **Router Agent** (a specialized Gemini prompt).
3.  **Decision**: The Router decides if the intent is `creative`, `tech`, or `general`.
4.  **Execution**: The system selects the corresponding **Sub-Agent** (with a specific system instruction) to generate the final response.
5.  **Response**: The response is displayed in the UI, tagged with the agent that handled it.

## 🎨 Design

The "Antigravity" theme features:
-   **Deep Space Background**: Dark, immersive colors.
-   **Floating Orbs**: Animated background elements.
-   **Glassmorphism**: Translucent cards and inputs.
-   **Google Colors**: Subtle neon accents representing the Google brand.

---

*Built with Google Gemini API, Node.js, and Vanilla JS.*
