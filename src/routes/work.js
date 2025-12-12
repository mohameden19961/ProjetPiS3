const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');
const upload = require('../middlewares/upload');

router.post('/submit', upload.array('files'), workController.submitWork);

router.get('/all-submissions', workController.getProfessorDashboard);

module.exports = router;