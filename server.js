const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const db = require('./src/database/db');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    
    socket.on('join_exam', (data) => {
        const { matricule } = data;
        const time = new Date().toLocaleString('fr-FR');

        db.run(`INSERT INTO logs (matricule, action, timestamp) VALUES (?, ?, ?)`, 
            [matricule, 'CONNEXION', time]
        );

        socket.join("exam_room");
        io.emit('student_connected', { matricule, time });
    });

    socket.on('disconnect', () => {
        const time = new Date().toLocaleString('fr-FR');
        
        io.emit('student_disconnected', { 
            id: socket.id, 
            time: time 
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});