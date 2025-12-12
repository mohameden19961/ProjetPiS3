const db = require('../database/db');

module.exports = (io) => {
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

        socket.on('switched_window', (data) => {
            const { matricule } = data;
            const time = new Date().toLocaleString('fr-FR');

            db.run(`INSERT INTO logs (matricule, action, timestamp) VALUES (?, ?, ?)`, 
                [matricule, 'NAVIGATION_EXTERNE', time]
            );

            io.emit('alert_teacher', {
                type: 'NAV',
                matricule: matricule,
                message: `L'étudiant ${matricule} est sur une autre fenêtre`,
                time: time
            });
        });

        socket.on('returned_to_exam', (data) => {
            const { matricule } = data;
            const time = new Date().toLocaleString('fr-FR');

            db.run(`INSERT INTO logs (matricule, action, timestamp) VALUES (?, ?, ?)`, 
                [matricule, 'RETOUR_EXAMEN', time]
            );

            io.emit('alert_teacher', {
                type: 'RETURN',
                matricule: matricule,
                message: `L'étudiant ${matricule} est revenu sur le navigateur`,
                time: time
            });
        });

        socket.on('disconnect', () => {
            const time = new Date().toLocaleString('fr-FR');
            io.emit('student_disconnected', { 
                id: socket.id, 
                time: time 
            });
        });
    });
};