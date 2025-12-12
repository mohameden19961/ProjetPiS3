const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/student/:email', authMiddleware.isProf, profileController.getStudentProfile);
router.get('/', authMiddleware.isProf, profileController.getAllProfiles);

router.put('/:id_user', authMiddleware.isProf, profileController.updateProfile);
router.delete('/:id_user', authMiddleware.isProf, profileController.deleteProfile);

module.exports = router;