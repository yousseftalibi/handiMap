import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './chat.css';
const Chat = () => {   
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const socket = useRef(null);
    useEffect(() => {
        socket.current = io("http://localhost:5000");
        
        socket.current.on("connect", () => {
          console.log('WebSocket connected');
        });
    
        socket.current.on("message", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
          if (socket.current) {
            socket.current.disconnect();
          }
        };
      }, []);

      const sendMessage = () => {
        const newMessage = {
          id: "3000",
          message: inputMessage,
        };
      
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        socket.current.emit("message",  {...newMessage} );
        setInputMessage('');
      };
      
      
      const renderMessage = (message, index) => {
        const isSentMessage = message.from === 'other';
      
        return (
          <div key={index} className={`media media-chat ${isSentMessage ? 'media-chat-reverse' : ''}`}>
            {!isSentMessage && (
              <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" />
            )}
            <div className="media-body">
              <p>{message.message}</p>
              
            </div>
          </div>
        );
      };
      
      
  return (

    <div className="chatbox">
            <div  class="messages">
                {messages.map((message, index) => renderMessage(message, index))}
            </div>

            <div className="publisher bt-1 border-light">
                <input type="text" placeholder="Write something"  value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}/>
                <button id="sendMessage" type="button" onClick={sendMessage}>Send</button>
            </div>

    </div>
          
  );
};

export default Chat;
