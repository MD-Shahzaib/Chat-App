import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { UserContext } from '../context/UserContext';
import Dropdown from './Dropdown';

// Comment: This component represents an individual chat message.
const ChatMessage = ({ message: { author, message, time }, isOwnMessage }) => {
    const messageStyle = isOwnMessage ? 'bg-teal-800' : 'bg-slate-700';
    return (
        <div className={`${isOwnMessage ? 'text-right' : 'text-left'} mb-2`}>
            <div className={`inline-block rounded-lg py-2 px-4 max-w-xs text-white break-words ${messageStyle}`}>
                {!isOwnMessage && <p className="text-sm font-medium text-cyan-500 capitalize">{author}</p>}
                <p className="text-sm my-0.5">{message}</p>
                <p className={`text-xs ${!isOwnMessage ? "text-gray-400" : "text-gray-300"} font-medium text-right`}>{time}</p>
            </div>
        </div>
    );
};

// Comment: This component renders the list of chat messages.
const ChatMessages = ({ messageList, username }) => {
    return (
        <main className="p-4">
            <ScrollToBottom className="h-[calc(100vh-10.5rem)]">
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

// Comment: This component represents the input field for sending messages.
const ChatInput = ({ onSendMessage }) => {
    const [currentMsg, setCurrentMsg] = useState('');
    // Comment: Handles sending a message when the "Send" button is clicked.
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
                onKeyUp={(e) => e.key === 'Enter' && handleSendMsg()}
            />
            <button
                type="button"
                onClick={handleSendMsg}
                className="bg-slate-800 hover:bg-slate-700 font-semibold text-white py-2 px-4 rounded-lg ml-4"
            >Send</button>
        </footer>
    );
};

// Comment: This is the main ChatRoom component that ties everything together.
const ChatRoom = () => {
    const { user, handleLogout } = useContext(UserContext);
    const [messageList, setMessageList] = useState([]);
    const [socket, setSocket] = useState(null);
    const defaultRoom = "myRoom"

    // Comment: Establishes a socket connection when the component mounts.
    useEffect(() => {
        const newSocket = io.connect("http://localhost:4000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect(); // Clean up socket on component unmount.
        };
    }, []);

    // Use the socket instance to emit and listen for events.
    // Comment: Handles socket events for sending and receiving messages.
    useEffect(() => {
        if (socket) {
            // Emit event to join a room with (defaultRoom).
            socket.emit('join_room', defaultRoom);

            // Listen for incoming messages.
            socket.on('receive_message', (data) => {
                setMessageList((prevMessages) => [...prevMessages, data]);
            });
        }
    }, [socket]);

    // Comment: Handles sending a message through the socket.
    const handleSendMessage = (message) => {
        const messageData = {
            room: defaultRoom,
            message: message,
            author: user.name,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        if (socket) {
            // Emit the message to the server.
            socket.emit('send_message', messageData);
        }
        setMessageList((prevMessages) => [...prevMessages, messageData]);
    };

    return (
        <div className="bg-slate-800">
            <header className="bg-slate-900 text-white py-4 px-6 flex justify-between items-center">
                <span className="text-2xl font-bold">MyChat</span>
                <Dropdown userName={user?.name} userEmail={user?.email} logout={handleLogout} />
            </header>
            <ChatMessages messageList={messageList} username={user?.name} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;