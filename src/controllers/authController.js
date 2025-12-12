const User = require('../models/User');
const Profile = require('../models/Profile');
const Ens = require('../models/Ens');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { email, password, role, matricule, level, nom, noms_ens } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        User.create({ email, password: hashedPassword, role }, function(err) {
            if (err) return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });

            const userId = this.lastID;

            if (role === 'etudiant') {
                Profile.create({ id_user: userId, email, matricule, level, nom }, (err) => {
                    if (err) return res.status(500).json({ error: "Erreur profil étudiant" });
                    res.status(201).json({ message: "Étudiant créé avec succès" });
                });
            } 
            else if (role === 'prof') {
                Ens.create(noms_ens || nom, email, (err) => {
                    if (err) return res.status(500).json({ error: "Erreur profil enseignant" });
                    res.status(201).json({ message: "Enseignant créé avec succès" });
                });
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

        res.status(200).json({ 
            message: "Connexion réussie", 
            user: { id: user.id, email: user.email, role: user.role } 
        });
    });
};