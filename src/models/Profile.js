const db = require('../database/db');

const Profile = {
    create: (profileData, callback) => {
        const { id_user, email, matricule, level, nom } = profileData;
        const sql = `INSERT INTO profile (id_user, email, matricule, level, nom) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [id_user, email, matricule, level, nom], callback);
    }
};

module.exports = Profile;