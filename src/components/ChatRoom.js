import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:4000");

const ChatRoom = ({ username }) => {
    const navigate = useNavigate();
    const [currentMsg, setCurrentMsg] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMsg = async () => {
        if (!currentMsg) return alert("Write something");
        const msgDate = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
        const messageData = {
            author: username,
            message: currentMsg,
            time: msgDate
        };
        await socket.emit("send_message", messageData);
        setMessages((list) => [...list, messageData]);
        setCurrentMsg('');
    };

    useEffect(() => {
        // Your code to fetch and update messages
        socket.on("receive_message", (data) => {
            setMessages((list) => [...list, data]);
        });
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
