const Profile = require('../models/Profile');
const Ens = require('../models/Ens');
const db = require('../database/db');



exports.getStudentProfile = (req, res) => {
    const { email } = req.params;
    Profile.findByEmail(email, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Profil étudiant non trouvé" });
        res.json(row);
    });
};

exports.getAllProfiles = (req, res) => {
    Profile.findAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

exports.updateProfile = (req, res) => {
    const { id_user } = req.params;
    const profileData = req.body;
    Profile.update(id_user, profileData, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Profil mis à jour avec succès" });
    });
};

exports.deleteProfile = (req, res) => {
    const { id_user } = req.params;
    Profile.delete(id_user, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Profil supprimé avec succès" });
    });
};


exports.getAllEns = (req, res) => {
    Ens.findAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

exports.getEnsByEmail = (req, res) => {
    const { email } = req.params;
    Ens.findByEmail(email, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Enseignant non trouvé" });
        res.json(row);
    });
};

exports.updateEns = (req, res) => {
    const { id } = req.params;
    const { noms, email } = req.body;
    Ens.update(id, noms, email, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Informations enseignant mises à jour avec succès" });
    });
};

exports.deleteEns = (req, res) => {
    const { id } = req.params;
    Ens.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Enseignant supprimé avec succès" });
    });
};

