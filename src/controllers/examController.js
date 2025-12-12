const Examen = require('../models/Examen');

exports.createExam = (req, res) => {
    const { description, titre, date_fin } = req.body;
    const file = req.file; 

    if (!file) {
        return res.status(400).json({ error: "Le fichier du sujet est obligatoire" });
    }

    const examData = {
        sujet_path: file.path,
        description,
        titre,
        date_fin
    };

    Examen.create(examData, (err) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la création de l'examen" });
        res.status(201).json({ message: "Examen publié avec succès" });
    });
};

// Récupérer l'examen en cours (Étudiant)
exports.getExam = (req, res) => {
    Examen.getLatest((err, exam) => {
        if (err || !exam) return res.status(404).json({ error: "Aucun examen disponible" });
        res.status(200).json(exam);
    });
};