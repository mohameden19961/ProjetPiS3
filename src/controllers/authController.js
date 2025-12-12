const User = require('../models/User');
const Profile = require('../models/Profile');
const Ens = require('../models/Ens');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key";

exports.register = async (req, res) => {
    const { email, password, role, matricule, level, nom, noms_ens } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        User.create({ email, password: hashedPassword, role }, function(err) {
            if (err) return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur", details: err.message });

            const userId = this.lastID;
            const token = jwt.sign({ id: userId, email, role }, SECRET_KEY, { expiresIn: '1d' });

            if (role === 'etudiant') {
                Profile.create({ id_user: userId, email, matricule, level, nom }, (err) => {
                    if (err) return res.status(500).json({ error: "Erreur profil étudiant" });
                    res.status(201).json({ message: "Étudiant créé avec succès", token });
                });
            } else if (role === 'prof') {
                Ens.create(noms_ens || nom, email, (err) => {
                    if (err) return res.status(500).json({ error: "Erreur profil enseignant" });
                    res.status(201).json({ message: "Enseignant créé avec succès", token });
                });
            } else {
                res.status(201).json({ message: "Utilisateur créé avec succès", token });
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur de hachage" });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, user) => {
        if (err || !user) return res.status(404).json({ error: "Utilisateur non trouvé" });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        if (user.inActive === 1) {
            return res.status(403).json({ error: "Compte inactif. Contactez l'administrateur." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            message: "Connexion réussie", 
            user: { id: user.id, email: user.email, role: user.role },
            token
        });
    });
};

exports.getAllUsers = (req, res) => {
    User.findAll((err, users) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs", details: err.message });
        res.status(200).json(users);
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur", details: err.message });
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
        res.status(200).json(user);
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { email, role, inActive, password } = req.body;
    
    // Gérer la mise à jour du mot de passe si fourni
    if (password) {
        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) return res.status(500).json({ error: "Erreur de hachage du mot de passe" });
            User.updatePassword(id, hashedPassword, (updateErr) => {
                if (updateErr) return res.status(500).json({ error: "Erreur mise à jour mot de passe", details: updateErr.message });
                // Continuer la mise à jour des autres champs si nécessaire
                User.update(id, { email, role, inActive }, (err) => {
                    if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur", details: err.message });
                    res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
                });
            });
        });
    } else {
        User.update(id, { email, role, inActive }, (err) => {
            if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur", details: err.message });
            res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
        });
    }
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.delete(id, (err) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur", details: err.message });
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    });
};