const db = require('../database/db');

const Examen = {
    create: (examData, callback) => {
        const { sujet_path, description, titre, date_fin } = examData;
        const sql = `INSERT INTO examen (sujet_path, description, titre, date_fin) VALUES (?, ?, ?, ?)`;
        db.run(sql, [sujet_path, description, titre, date_fin], callback);
    },

    getLatest: (callback) => {
        db.get(`SELECT * FROM examen ORDER BY id DESC LIMIT 1`, callback);
    },

    findAll: (callback) => {
        db.all(`SELECT * FROM examen ORDER BY date_fin DESC`, callback);
    },

    findById: (id, callback) => {
        db.get(`SELECT * FROM examen WHERE id = ?`, [id], callback);
    },

    update: (id, examData, callback) => {
        const { description, titre, date_fin } = examData;
        const sql = `UPDATE examen SET description = ?, titre = ?, date_fin = ? WHERE id = ?`;
        db.run(sql, [description, titre, date_fin, id], callback);
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM examen WHERE id = ?`, [id], callback);
    }
};

module.exports = Examen;