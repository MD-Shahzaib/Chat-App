require('dotenv').config();
const express = require("express");
// const { Server } = require("socket.io");
// const http = require('http');
const cors = require('cors');
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect To MongoDB.
db.connection.once("open", () => { console.log('✔✔ connect to MongoDB ✔✔') }).on("error", (err) => { console.log('❌❌ Connection error ❌❌==>', err) });

// // Socket.io Code.
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//     },
// });

// // User-Connected.
// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);

//     // JOIN-ROOM
//     socket.on("join_room", (data) => {
//         socket.join(data)
//         console.log(`User with ID:${socket.id} joined room: ${data}`);
//     });

//     // SEND-MSG
//     socket.on("send_message", (data) => {
//         // RECEIVE-MSG
//         socket.to(data.room).emit("receive_message", data);
//     });

//     // User-Disonnected
//     socket.on("disconnect", () => {
//         console.log("User Disconnected", socket.id);
//     });
// });

// Main Routes.
app.use('/', require('./routes/index.js'));

// Starting Server.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});