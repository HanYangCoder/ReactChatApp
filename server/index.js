const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Test users
const users = [
    { id: 1, username: 'john', password: 'password1' },
    { id: 2, username: 'jane', password: 'password2' },
];

// Test chatrooms
const chatrooms = [
    {
        room_id: 101,
        users: [1, 2]
    },
    {
        room_id: 102,
        users: [1, 2]
    }
];

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find((user) => user.username === username && user.password === password);
    
    if (user) {
        res.json({ success: true, message: 'Login successful', id: user.id, username: user.username });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

app.get('/chatrooms', (req, res) => {
    res.json(chatrooms);
});

server.listen(3001, () => {
    console.log("SERVER RUNNING AT PORT 3001");
});