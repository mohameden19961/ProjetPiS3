const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.isProf, logController.getAllLogs);
router.get('/:matricule', authMiddleware.isProf, logController.getLogsByMatricule);

router.delete('/:id', authMiddleware.isProf, logController.deleteLogEntry);
router.delete('/clear', authMiddleware.isProf, logController.clearAllLogs);

module.exports = router;