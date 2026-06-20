import { useEffect, useState } from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
function App() {
  const [chatMessages, setChatMessages] = useState(()=>{
    const storedMessages = localStorage.getItem('messages')
    return storedMessages ? JSON.parse(storedMessages) : []
  });

  useEffect(() => {
    Chatbot.addResponses({
      'give me a number':
        function () {
          let number = Math.floor(Math.random() * 100 + 1)
          return `Sure, here's your number, ${number}`
        }
    })
  }, [])
  useEffect(() => {
    console.log("component")
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])
  return (
    <div className="app-container">

      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
