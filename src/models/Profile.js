const db = require('../database/db');

const Profile = {
    create: (profileData, callback) => {
        const { id_user, email, matricule, level, nom } = profileData;
        const sql = `INSERT INTO profile (id_user, email, matricule, level, nom) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [id_user, email, matricule, level, nom], callback);
    },

    findByUserId: (id_user, callback) => {
        db.get(`SELECT * FROM profile WHERE id_user = ?`, [id_user], callback);
    },

    findAll: (callback) => {
        db.all(`SELECT * FROM profile`, callback);
    },

    update: (id_user, profileData, callback) => {
        const { email, matricule, level, nom } = profileData;
        const sql = `UPDATE profile SET email = ?, matricule = ?, level = ?, nom = ? WHERE id_user = ?`;
        db.run(sql, [email, matricule, level, nom, id_user], callback);
    },

    delete: (id_user, callback) => {
        db.run(`DELETE FROM profile WHERE id_user = ?`, [id_user], callback);
    }
};

module.exports = Profile;