require('dotenv').config()
const cors = require('cors');
const express = require("express");
const socket = require('socket.io');

const app = express();
const port = process.env.PORT || 5000;
require('./db')

app.use(express.json({ limit: '10mb' }))
app.use(cors())

const user = require('./api/user.route')
const session = require('./api/session.route')
const diet = require('./api/diet.route')
const chat = require('./api/chat.route')

app.use('/api/user', user)
app.use('/api/session', session)
app.use('/api/diet', diet)
app.use('/api/chat', chat)

app.get('/hello', (req, res) => {
    console.log('hello from server')
})

const server = app.listen(port, () => {
    console.log("Server is running is port: " + port);
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessage) => {
        console.log(newMessage)
        socket.in(newMessage.groupId).emit("message recieved", newMessage);
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});