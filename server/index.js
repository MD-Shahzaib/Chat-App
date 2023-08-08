require('dotenv').config();
const express = require("express");
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect To MongoDB.
db.connection.once("open", () => { console.log('✔✔ Connected to MongoDB ✔✔') }).on("error", (err) => { console.log('❌❌ Connection error ❌❌==>', err) });

// Main Routes.
app.use('/', require('./routes/index.js'));

// creating the app instance, to integrate Socket.io with server.
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// socket.io event listeners,
// io.on("connection", ...) to handle new connections and their corresponding events.
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Handle joining rooms event listener.
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User with ID:${socket.id} joined room: ${room}`);
    });

    // Handle sending and receiving messages event listener.
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });

    // Handle user disconnection event listener.
    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

// Starting Server.
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});