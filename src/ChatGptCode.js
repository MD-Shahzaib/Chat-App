/* 1st step */

// ------------------------ Login.js ------------------------.
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        // You can use an authentication service or backend API to authenticate the user
        // For simplicity, we'll just display the username in the console for now
        console.log('Logged in as:', username);
    };

    const handleSignup = () => {
        // Handle signup logic here
        // You can use an authentication service or backend API to register the new user
        // For simplicity, we'll just display the username in the console for now
        console.log('Signed up as:', username);
    };

    return (
        <div className="flex items-center justify-center flex-col gap-4 bg-slate-200 text-gray-800 min-h-screen">
            <h2 className='text-2xl'>Chat Application Login</h2>
            <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='bg-black text-white p-4 rounded'
            />
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-black text-white p-4 rounded'
            />
            <button onClick={handleLogin} className='bg-slate-800 text-white p-4 rounded'>Login</button>
            <button onClick={handleSignup} className='bg-slate-800 text-white p-4 rounded'>Sign Up</button>
        </div>
    );
};

export default Login;


// ------------------------ ChatRoom.js ------------------------.
import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

const ChatRoom = ({ username }) => {
    const [currentMsg, setCurrentMsg] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMsg = async () => {
        if (!currentMsg) return alert("Write something");
        const msgDate = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
        const messageData = {
            author: username,
            message: currentMsg,
            time: msgDate
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMsg('');
    };

    React.useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, []);

    return (
        <div className='p-5 bg-gray-800 text-white flex justify-center items-center flex-col min-h-screen'>
            <header className='bg-green-600 w-full flex justify-between items-center p-4'>
                <span>MyChat</span>
                <span>({username ? username : "(Guest)"})</span>
            </header>
            <main className='w-full bg-slate-300 text-black'>
                <div className="message-list">
                    {messageList.map((msg, index) => (
                        <div
                            key={index}
                            className={`${username !== msg.author ? "text-right bg-blue-500" : "text-left bg-green-500"}`}
                        >
                            <p>{msg.message}</p>
                            <p>{msg.time}</p>
                            <p>{msg.author}</p>
                        </div>
                    ))}
                </div>
            </main>
            <footer className='bg-green-700 w-full flex justify-between items-center p-4'>
                <input
                    type="text"
                    className='p-2 bg-slate-300 rounded text-black'
                    placeholder='Type message'
                    value={currentMsg}
                    onKeyPress={(e) => { e.key === "Enter" && sendMsg() }}
                    onChange={(e) => { setCurrentMsg(e.target.value) }}
                />
                <button
                    type="button"
                    onClick={sendMsg}
                    className='rounded bg-slate-50 p-1 text-black'>
                    Send
                </button>
            </footer>
        </div>
    );
};

export default ChatRoom;


// ------------------------ UserProfile.js ------------------------.
import React from 'react';

const UserProfile = ({ username }) => {
    return (
        <div className='p-5 bg-gray-800 text-white flex justify-center items-center flex-col min-h-screen'>
            <h2 className='text-2xl'>User Profile</h2>
            <p>Username: {username}</p>
            {/* Add more user information and settings here */}
        </div>
    );
};

export default UserProfile;

/* 1st step */

















/* 2nd step */

// ------------------------ server.js ------------------------.
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Secret key for JWT
const secretKey = 'your-secret-key';

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});


// ------------------------ server.js ------------------------.
// ... (previous code)

// Array to store registered users
const users = [];

// User model
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

// ... (remaining code)


// ------------------------ server.js ------------------------.
// ... (previous code)

// User Registration (Sign Up) route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and add to the users array
        const newUser = new User(username, hashedPassword);
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// ------------------------ server.js ------------------------.
// ... (previous code)

// User Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
        // Compare the provided password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// ------------------------ server.js ------------------------.
// ... (previous code)

// Middleware for protected routes
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

// Protected route (e.g., chat room)
app.get('/chat', authenticateToken, (req, res) => {
    // Handle protected route logic here
    // For simplicity, we'll just return a message with the authenticated username
    res.json({ message: `Welcome to the chat room, ${req.user.username}!` });
});

// ... (remaining code)

/* 2nd step */



















/* 3rd step */

// ------------------------ ChatInput.js ------------------------.
import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
    const [currentMsg, setCurrentMsg] = useState('');

    const handleSendMsg = () => {
        if (!currentMsg) return;
        onSendMessage(currentMsg);
        setCurrentMsg('');
    };

    return (
        <footer className='bg-green-700 w-full flex justify-between items-center p-4'>
            <input
                type="text"
                className='p-2 bg-slate-300 rounded text-black'
                placeholder='Type message'
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMsg()}
            />
            <button
                type="button"
                onClick={handleSendMsg}
                className='rounded bg-slate-50 p-1 text-black'
            >
                Send
            </button>
        </footer>
    );
};

export default ChatInput;



// ------------------------ ChatMessage.js ------------------------.
import React from 'react';

const ChatMessage = ({ message, isOwnMessage }) => {
    return (
        <div className={`${isOwnMessage ? 'text-right bg-blue-500' : 'text-left bg-green-500'}`}>
            <p>{message.message}</p>
            <p>{message.time}</p>
            <p>{message.author}</p>
        </div>
    );
};

export default ChatMessage;


// ------------------------ ChatMessages.js ------------------------.
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatMessage from './ChatMessage';

const ChatMessages = ({ messageList, username }) => {
    return (
        <main className='w-full bg-slate-300 text-black'>
            <ScrollToBottom className='h-60'>
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

export default ChatMessages;



// ------------------------ ChatRoom.js ------------------------.
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const socket = io.connect('http://localhost:4000');

const ChatRoom = ({ username }) => {
    const [messageList, setMessageList] = useState([]);

    const handleSendMessage = (message) => {
        const msgDate = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
        const messageData = {
            author: username,
            message: message,
            time: msgDate,
        };
        socket.emit('send_message', messageData);
        setMessageList((list) => [...list, messageData]);
    };

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, []);

    return (
        <div className='p-5 bg-gray-800 text-white flex justify-center items-center flex-col min-h-screen'>
            <header className='bg-green-600 w-full flex justify-between items-center p-4'>
                <span>MyChat</span>
                <span>({username ? username : '(Guest)'})</span>
            </header>
            <ChatMessages messageList={messageList} username={username} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;

/* 3rd step */






















/* 4th step */

// ------------------------ App.js ------------------------.
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect('http://localhost:4000');

const App = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [showChat, setShowChat] = useState(false);

    const handleJoin = () => {
        if (!name || !room) {
            return alert('Please fill all fields.');
        }
        socket.emit('join_room', room);
        setShowChat(true);
    };

    return (
        <>
            {!showChat ? (
                <div className='flex items-center justify-center flex-col gap-4 bg-slate-200 text-gray-800 min-h-screen'>
                    <h2 className='text-2xl'>Join A Chat</h2>
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className='bg-black text-white p-4 rounded'
                    />
                    <input
                        type='text'
                        placeholder='Room'
                        value={room}
                        onChange={(e) => {
                            setRoom(e.target.value);
                        }}
                        className='bg-black text-white p-4 rounded'
                    />
                    <button onClick={handleJoin} className='bg-slate-800 text-white p-4 rounded'>
                        JOIN
                    </button>
                </div>
            ) : (
                <Chat socket={socket} userName={name} room={room} />
            )}
        </>
    );
};

export default App;


// ------------------------ server.js ------------------------.
//  ... (previous code)

// User-Connected.
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // JOIN-ROOM
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID:${socket.id} joined room: ${data}`);
    });

    // SEND-MSG
    socket.on('send_message', (data) => {
        // RECEIVE-MSG
        socket.to(data.room).emit('receive_message', data);
    });

    // User-Disonnected
    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});

// ... (remaining code)

/* 4th step */






















/* 5th step */

// ------------------------ Login.js ------------------------.
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // ... (handle login logic)
    };

    const handleSignup = () => {
        // ... (handle signup logic)
    };

    return (
        <div className="flex items-center justify-center flex-col h-screen">
            <h2 className="text-2xl font-bold mb-4">Chat Application Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-64 py-2 px-4 rounded border border-gray-400 mb-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-64 py-2 px-4 rounded border border-gray-400 mb-4"
            />
            <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Login
            </button>
            <button onClick={handleSignup} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Sign Up
            </button>
        </div>
    );
};

export default Login;


// ------------------------ ChatRoom.js ------------------------.
import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const ChatRoom = ({ username }) => {
    const [messageList, setMessageList] = useState([]);

    const handleSendMessage = (message) => {
        // ... (handle send message logic)
    };

    useEffect(() => {
        // ... (Socket.io connection logic)
    }, []);

    return (
        <div className="h-screen bg-gray-100">
            <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
                <span className="text-2xl font-bold">MyChat</span>
                <span className="text-lg font-semibold">Welcome, {username || 'Guest'}</span>
            </header>
            <ChatMessages messageList={messageList} username={username} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;


// ------------------------ ChatInput.js ------------------------.
import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
    const [currentMsg, setCurrentMsg] = useState('');

    const handleSendMsg = () => {
        // ... (handle send message logic)
    };

    return (
        <footer className="bg-gray-200 p-4 flex justify-between items-center">
            <input
                type="text"
                className="w-full py-2 px-4 rounded border border-gray-400"
                placeholder="Type message"
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMsg()}
            />
            <button
                type="button"
                onClick={handleSendMsg}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-4"
            >
                Send
            </button>
        </footer>
    );
};

export default ChatInput;


// ------------------------ ChatMessages.js ------------------------.
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatMessage from './ChatMessage';

const ChatMessages = ({ messageList, username }) => {
    return (
        <main className="h-80 overflow-y-auto p-4">
            <ScrollToBottom>
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

export default ChatMessages;



/* 5th step */