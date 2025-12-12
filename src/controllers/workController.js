const Work = require('../models/Work');
const Examen = require('../models/Examen');
const db = require('../database/db');
const fs = require('fs');

exports.submitWork = (req, res) => {
    const { id_etud, nom, matricule } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ error: "Aucun fichier reçu" });
    }

    Examen.getLatest((err, latestExam) => {
        if (err || !latestExam) return res.status(500).json({ error: "Impossible de vérifier l'heure de fin." });

        const now = new Date();
        const dateFin = new Date(latestExam.date_fin);

        if (now > dateFin) {
            // Supprimer les fichiers qui viennent d'être uploadés si l'heure est dépassée
            files.forEach(file => fs.unlink(file.path, () => {}));
            return res.status(403).json({ error: "Le temps d'examen est écoulé. Soumission rejetée." });
        }

        const formattedDate = now.toLocaleString('fr-FR');
        const file_paths = JSON.stringify(files.map(f => f.path));

        const workData = { id_etud, nom, matricule, nb_files: files.length, file_paths };

        // Tenter de mettre à jour d'abord (si c'est une resoumission)
        Work.updateSubmission(id_etud, files.length, file_paths, (err) => {
            if (err) {
                // Si la mise à jour échoue (probablement pas d'entrée existante)
                Work.submit(workData, (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ message: "Fichiers enregistrés (première soumission)", submitted_at: formattedDate, folder: `uploads/submissions/${matricule}` });
                });
            } else {
                res.status(200).json({ message: "Fichiers mis à jour (resoumission)", submitted_at: formattedDate, folder: `uploads/submissions/${matricule}` });
            }
        });
    });
};

exports.getProfessorDashboard = (req, res) => {
    Work.getAllSubmissions((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getSubmissionByStudent = (req, res) => {
    const { id_etud } = req.params;
    Work.findByStudentId(id_etud, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Aucune soumission trouvée pour cet étudiant." });
        res.json(row);
    });
};

exports.deleteSubmission = (req, res) => {
    const { id } = req.params;
    Work.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Soumission supprimée avec succès." });
    });
};