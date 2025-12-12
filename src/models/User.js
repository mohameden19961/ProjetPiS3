const db = require('../database/db');

const User = {
    create: (userData, callback) => {
        const { email, password, role } = userData;
        const sql = `INSERT INTO users (email, password, role, inActive) VALUES (?, ?, ?, 0)`;
        db.run(sql, [email, password, role], callback);
    },
    
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.get(sql, [email], callback);
    },

    findById: (id, callback) => {
        const sql = `SELECT id, email, role, inActive FROM users WHERE id = ?`;
        db.get(sql, [id], callback);
    },

    findAll: (callback) => {
        const sql = `SELECT id, email, role, inActive FROM users`;
        db.all(sql, callback);
    },

    update: (id, userData, callback) => {
        const { email, role, inActive } = userData;
        let sql = `UPDATE users SET email = ?, role = ?, inActive = ? WHERE id = ?`;
        db.run(sql, [email, role, inActive, id], callback);
    },

    delete: (id, callback) => {
        const sql = `DELETE FROM users WHERE id = ?`;
        db.run(sql, [id], callback);
    },

    updatePassword: (id, hashedPassword, callback) => {
        const sql = `UPDATE users SET password = ? WHERE id = ?`;
        db.run(sql, [hashedPassword, id], callback);
    }
};

module.exports = User;