const Work = require('../models/Work');
const db = require('../database/db');

exports.submitWork = (req, res) => {
    const { id_etud, nom, matricule } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ error: "Aucun fichier reçu" });
    }

    const workData = {
        id_etud,
        nb_files: files.length,
        file_paths: JSON.stringify(files.map(f => f.path)),
        nom,
        matricule
    };

    Work.submit(workData, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Fichiers enregistrés avec succès" });
    });
};

exports.getProfessorDashboard = (req, res) => {
    Work.getAllSubmissions((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};