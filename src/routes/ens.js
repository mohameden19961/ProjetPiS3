const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.isProf, profileController.getAllEns); 
router.get('/:email', authMiddleware.isProf, profileController.getEnsByEmail);

router.put('/:id', authMiddleware.isProf, profileController.updateEns);
router.delete('/:id', authMiddleware.isProf, profileController.deleteEns);

module.exports = router;