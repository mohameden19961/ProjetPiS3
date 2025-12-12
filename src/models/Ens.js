const db = require('../database/db');

const Ens = {
    create: (noms, email, callback) => {
        const sql = `INSERT INTO ens (noms, email) VALUES (?, ?)`;
        db.run(sql, [noms, email], callback);
    },

    findByEmail: (email, callback) => {
        db.get(`SELECT * FROM ens WHERE email = ?`, [email], callback);
    },

    findAll: (callback) => {
        db.all(`SELECT * FROM ens`, callback);
    },

    update: (id, noms, email, callback) => {
        const sql = `UPDATE ens SET noms = ?, email = ? WHERE id = ?`;
        db.run(sql, [noms, email, id], callback);
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM ens WHERE id = ?`, [id], callback);
    }
};

module.exports = Ens;