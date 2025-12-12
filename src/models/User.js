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
    }
};

module.exports = User;