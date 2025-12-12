const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', authMiddleware.isProf, authController.getAllUsers);
router.get('/users/:id', authMiddleware.isProf, authController.getUserById);
router.put('/users/:id', authMiddleware.isProf, authController.updateUser);
router.delete('/users/:id', authMiddleware.isProf, authController.deleteUser);

module.exports = router;