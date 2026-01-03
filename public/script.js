const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatHistory = document.getElementById('chat-history');
const typingIndicator = document.getElementById('typing-indicator');

// Auto-scroll to bottom
function scrollToBottom() {
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Create message element
function createMessageElement(content, type, agentInfo = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);

    let avatarHTML = '';
    if (type === 'user') {
        avatarHTML = `
            <div class="avatar user-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
        `;
    } else {
        // System/Agent avatar
        avatarHTML = `
            <div class="avatar system-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
        `;
    }

    let contentHTML = '';
    if (agentInfo) {
        contentHTML = `
            <div class="content">
                <div style="margin-bottom: 5px; font-size: 0.8rem; color: var(--text-secondary);">
                    <span class="tag ${agentInfo.role}">${agentInfo.name}</span>
                </div>
                ${formatMessage(content)}
            </div>
        `;
    } else {
        contentHTML = `
            <div class="content">
                ${formatMessage(content)}
            </div>
        `;
    }

    messageDiv.innerHTML = avatarHTML + contentHTML;
    return messageDiv;
}

// Simple markdown-like formatting
function formatMessage(text) {
    // Convert newlines to <br>
    let formatted = text.replace(/\n/g, '<br>');
    // Bold **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Code `text`
    formatted = formatted.replace(/`(.*?)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 4px;">$1</code>');
    return formatted;
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Add user message
    const userMsgElement = createMessageElement(message, 'user');
    chatHistory.appendChild(userMsgElement);
    userInput.value = '';
    scrollToBottom();

    // 2. Show typing indicator
    typingIndicator.classList.add('active');

    try {
        // 3. Call API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // 4. Hide typing indicator
        typingIndicator.classList.remove('active');

        // 5. Add agent response
        if (data.error) {
            const errorMsg = createMessageElement("Error: " + data.error, 'system');
            chatHistory.appendChild(errorMsg);
        } else {
            const agentMsg = createMessageElement(data.response, 'system', {
                name: data.agent,
                role: data.role
            });
            chatHistory.appendChild(agentMsg);
        }

    } catch (error) {
        console.error('Error:', error);
        typingIndicator.classList.remove('active');
        const errorMsg = createMessageElement("Sorry, something went wrong. Please try again.", 'system');
        chatHistory.appendChild(errorMsg);
    }

    scrollToBottom();
});
