const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const PORT = 4000;
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// User-Connected.
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // JOIN-ROOM
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID:${socket.id} joined room: ${data}`);
    });

    // SEND-MSG
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    // User-Disonnected
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});


server.listen(PORT, () => {
    console.log(`Server is Running on Port=${PORT}`);
});