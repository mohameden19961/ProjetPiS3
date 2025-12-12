const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route pour voir la liste des enseignants (Table: ens)
router.get('/', profileController.getAllEns);

module.exports = router;