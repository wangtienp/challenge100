import { useState } from "react";
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'
import LoadingSpinner from '../assets/loading-spinner.gif'
export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setLoading] = useState(false)

    function saveInputText(event) {
        setInputText(event.target.value);
    }
    function keyboardEvent(e) {
        switch (e.key) {
            case "Enter": sendMessage()
                break;
            case "Escape": setInputText("")
                break;
        }
    }
    function clearMessage(){
        localStorage.removeItem('messages')
        setChatMessages([])
    }
    async function sendMessage() {
        if (inputText.trim() == "" || isLoading) return

        setLoading(true)
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];

        setChatMessages(newChatMessages);


        setChatMessages([
            ...newChatMessages,
            {
                message: <img src={LoadingSpinner} className="loading-spinner" />,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);
        setInputText('');
        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);
        setLoading(false)
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                onKeyDown={keyboardEvent}
                className="chat-input"
            />
            <button
                onClick={sendMessage}
                className="send-button"
            >
                Send
            </button>
            <button className="clear-button" onClick={clearMessage}>
                Clear
            </button>
        </div>
    );
}