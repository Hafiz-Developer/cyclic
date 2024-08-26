// socket.js
const { Server } = require('socket.io');
let io;

const initSocket = (server) => {
    if (!io) {
        io = new Server(server);
    }
    return io;
};

const getSocket = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }
    return io;
};

module.exports = { initSocket, getSocket };
