const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const upload = require('../middlewares/upload');

router.post('/create', upload.single('sujet'), examController.createExam);
router.get('/current', examController.getExam);

module.exports = router;