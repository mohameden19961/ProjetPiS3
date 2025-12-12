const db = require('../database/db');

const Work = {
    submit: (workData, callback) => {
        const { id_etud, nb_files, file_paths, nom, matricule } = workData;
        const last_update = new Date().toISOString();
        const sql = `INSERT INTO works (id_etud, nb_files, file_paths, nom, matricule, last_update) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(sql, [id_etud, nb_files, file_paths, nom, matricule, last_update], callback);
    },

    getAllSubmissions: (callback) => {
        db.all(`SELECT * FROM works ORDER BY last_update DESC`, callback);
    }
};

module.exports = Work;