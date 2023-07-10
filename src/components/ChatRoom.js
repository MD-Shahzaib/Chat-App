import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Your code to fetch and update messages

        // For the sake of example, we're using a static array of messages
        setMessages([
            { id: 1, text: 'Hello' },
            { id: 2, text: 'How are you?' },
        ]);
    }, []);

    const handleLogout = () => {
        // Your logout logic here

        // After logout, navigate back to the login page
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4">Chat Room</h1>
            <div className="bg-white rounded-lg shadow-lg w-96 max-w-full p-4">
                <ul className="overflow-y-auto max-h-64">
                    {messages.map((message) => (
                        <li key={message.id} className="text-gray-800 p-2 mb-2 rounded-md bg-gray-200">
                            {message.text}
                        </li>
                    ))}
                </ul>
                <button
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
