const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');
const upload = require('../middlewares/upload');

// Route pour l'étudiant : Envoyer ses fichiers 
router.post('/submit', upload.array('files'), workController.submitWork);

// Route pour le professeur : Voir tous les rendus [cite: 13, 19]
router.get('/all-submissions', workController.getProfessorDashboard);

module.exports = router;