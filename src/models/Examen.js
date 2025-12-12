const db = require('../database/db');

const Examen = {
    create: (examData, callback) => {
        const { sujet_path, description, titre, date_fin } = examData;
        const sql = `INSERT INTO examen (sujet_path, description, titre, date_fin) VALUES (?, ?, ?, ?)`;
        db.run(sql, [sujet_path, description, titre, date_fin], callback);
    },

    getLatest: (callback) => {
        db.get(`SELECT * FROM examen ORDER BY id DESC LIMIT 1`, callback);
    }
};

module.exports = Examen;