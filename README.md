# Google Antigravity - Agentic AI System

**Google Antigravity** is a next-generation AI IDE demo powered by Google's Gemini model. It demonstrates the "Agent-First" development philosophy, where a **Router Agent** intelligently directs queries to specialized sub-agents and manages your editor, terminal, and browser autonomously.

## 🌌 Features

-   **Multi-Agent Architecture**:
    -   **Router Agent**: Analyzes intent and routes queries to the correct expert.
    -   **Tech Agent**: Expert in code generation, debugging, and terminal execution.
    -   **Creative Agent**: Handles abstract ideas, design, and storytelling.
-   **Dual-Surface Interface**: 
    -   **Editor Surface**: A familiar VS Code-like environment for hands-on coding.
    -   **Manager Surface**: A "Mission Control" for spawning and orchestrating autonomous agents.
-   **Premium UI**: A "gravity-defying" interface with glassmorphism, neon accents, and smooth animations.

## ⌨️ Shortcuts & Controls

Master the Antigravity interface with these essential keyboard shortcuts.

### ⚡ Essentials
| Action | macOS | Windows/Linux |
| :--- | :--- | :--- |
| **Toggle Agent Panel** | `Cmd + L` | `Ctrl + L` |
| **Inline Command** (AI Edit) | `Cmd + I` | `Ctrl + I` |
| **Toggle Terminal** | `Ctrl + ` ` | `Ctrl + ` ` |
| **Settings** | `Cmd + ,` | `Ctrl + ,` |

### 🧠 Mode Switching
Antigravity features distinct modes for different workflows.

| Action | macOS | Windows/Linux | Description |
| :--- | :--- | :--- | :--- |
| **Toggle Editor/Agent** | `Cmd + E` | `Ctrl + E` | Switch between code focus and agent chat. |
| **Switch to Manager View** | `Cmd + Shift + M` | `Ctrl + Shift + M` | Open the "Mission Control" to manage multiple agents. |

### 💬 Agent Triggers (Verbal Shortcuts)
Use these keywords at the start of your prompt to force specific routing behavior:

* **Tech/Code**: `Code`, `Debug`, `Function`, `API`, `Script`
* **Creative**: `Imagine`, `Story`, `Design`, `Write`
* **General**: `Explain`, `Define`, `Summary`

## 🚀 Getting Started

### Prerequisites

-   Node.js installed.
-   A Google Gemini API Key.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/Bhaiyahns45/Google-Antigravity.git](https://github.com/Bhaiyahns45/Google-Antigravity.git)
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

---

*Built with Google Gemini API, Node.js, and Vanilla JS.*
