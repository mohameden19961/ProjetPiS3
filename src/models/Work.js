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
    },

    findByStudentId: (id_etud, callback) => {
        db.get(`SELECT * FROM works WHERE id_etud = ? ORDER BY last_update DESC LIMIT 1`, [id_etud], callback);
    },

    updateSubmission: (id_etud, nb_files, file_paths, callback) => {
        const last_update = new Date().toISOString();
        const sql = `UPDATE works SET nb_files = ?, file_paths = ?, last_update = ? WHERE id_etud = ?`;
        db.run(sql, [nb_files, file_paths, last_update, id_etud], callback);
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM works WHERE id = ?`, [id], callback);
    }
};

module.exports = Work;