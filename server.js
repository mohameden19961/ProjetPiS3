const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    
    socket.on('join_exam', (data) => {
        socket.join("exam_room");
        io.emit('student_connected', {
            matricule: data.matricule,
            time: new Date().toLocaleString('fr-FR')
        });
    });

    socket.on('disconnect', () => {
        io.emit('student_disconnected', {
            id: socket.id,
            time: new Date().toLocaleString('fr-FR')
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});