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

exports.getExam = (req, res) => {
    Examen.getLatest((err, exam) => {
        if (err || !exam) return res.status(404).json({ error: "Aucun examen disponible" });
        res.status(200).json(exam);
    });
};

exports.getAllExams = (req, res) => {
    Examen.findAll((err, exams) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(exams);
    });
};

exports.getExamById = (req, res) => {
    const { id } = req.params;
    Examen.findById(id, (err, exam) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!exam) return res.status(404).json({ error: "Examen non trouvé" });
        res.status(200).json(exam);
    });
};

exports.updateExam = (req, res) => {
    const { id } = req.params;
    const { description, titre, date_fin } = req.body;
    
    Examen.update(id, { description, titre, date_fin }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Examen mis à jour avec succès" });
    });
};

exports.deleteExam = (req, res) => {
    const { id } = req.params;
    Examen.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Examen supprimé avec succès" });
    });
};