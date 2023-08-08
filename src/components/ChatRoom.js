// ChatRoom.js
import React, { useState, useEffect, useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { UserContext } from '../context/UserContext';
import Dropdown from './Dropdown';

const ChatRoom = ({ username }) => {
    const { user, handleLogout } = useContext(UserContext);
    const [messageList, setMessageList] = useState([]);
    const handleSendMessage = (message) => {
        setMessageList((prevMessages) => [
            ...prevMessages,
            {
                message: message,
                author: username,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]);
    };

    useEffect(() => {
        // ... (Socket.io connection logic)
        // For simplicity, we won't implement the Socket.io logic here.
        // Instead, we'll just add some dummy messages when the component mounts.

        // Dummy data to simulate incoming messages
        const dummyMessages = [
            { message: 'Hello!', author: 'John', time: '10:00 AM' },
            { message: 'Hi there!', author: 'Alice', time: '10:05 AM' },
            { message: 'How are you?', author: 'John', time: '10:10 AM' },
            { message: 'I am good!', author: 'Alice', time: '10:15 AM' },
        ];

        setMessageList(dummyMessages);
    }, []);

    return (
        <div className="bg-slate-800">
            <header className="bg-slate-900 text-white py-4 px-6 flex justify-between items-center">
                <span className="text-2xl font-bold">MyChat</span>
                <Dropdown userName={user?.name} userEmail={user?.email} logout={handleLogout} />
            </header>
            <ChatMessages messageList={messageList} username={username} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;

// ChatMessage.js
const ChatMessage = ({ message, isOwnMessage }) => {
    return (
        <div className={`${isOwnMessage ? 'text-right' : 'text-left'} mb-2`}>
            <div
                className={`inline-block rounded-lg py-2 px-4 max-w-xs text-white ${isOwnMessage ? 'bg-teal-800' : 'bg-slate-700'
                    }`}
            >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs text-gray-300">{message.time}</p>
            </div>
        </div>
    );
};

// ChatMessages.js
const ChatMessages = ({ messageList, username }) => {
    return (
        <main className="p-4">
            <ScrollToBottom className='h-[calc(100vh-10.5rem)]'>
                {messageList.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        message={msg}
                        isOwnMessage={msg.author === username}
                    />
                ))}
            </ScrollToBottom>
        </main>
    );
};

// ChatInput.js
const ChatInput = ({ onSendMessage }) => {
    const [currentMsg, setCurrentMsg] = useState('');
    const handleSendMsg = () => {
        if (currentMsg.trim() !== '') {
            onSendMessage(currentMsg);
            setCurrentMsg('');
        }
    };
    return (
        <footer className="bg-slate-900 p-4 flex justify-between items-center sticky bottom-0">
            <input
                type="text"
                className="w-full py-2 px-4 rounded-lg bg-slate-800 outline-none text-white placeholder:text-white"
                placeholder="Type a message"
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMsg()}
            />
            <button
                type="button"
                onClick={handleSendMsg}
                className="bg-slate-800 hover:bg-slate-700 font-semibold text-white py-2 px-4 rounded-lg ml-4"
            >Send</button>
        </footer>
    );
};