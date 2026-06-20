import { useEffect, useRef } from "react"
import { ChatMessage } from "./ChatMessage"
import './ChatMessages.css'

export function ChatMessages({ chatMessages }) {

    function useAutoScroll(chatMessages) {
        const chatMessageContainer = useRef(null)
        useEffect(() => {
            const chatMessageElem = chatMessageContainer.current
            chatMessageElem.scrollTop = chatMessageElem.scrollHeight
        }, [chatMessages])
        return chatMessageContainer
    }
    return (
        <div className="chat-messages-container" ref={useAutoScroll(chatMessages)}>
            {chatMessages.length === 0 &&
                <div className="welcome-messages">
                    Welcome to the chatbot project! Send a message using the textbox below.
                </div>}
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    );
}