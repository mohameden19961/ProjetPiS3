const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/student/:email', profileController.getStudentProfile);
router.get('/teachers', profileController.getAllEns);

module.exports = router;