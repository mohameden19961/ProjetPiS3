const db = require('../database/db');

const Ens = {
    create: (noms, email, callback) => {
        const sql = `INSERT INTO ens (noms, email) VALUES (?, ?)`;
        db.run(sql, [noms, email], callback);
    }
};

module.exports = Ens;