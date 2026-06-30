const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

// Protected routes
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.put('/profile/preferences', authenticateToken, userController.updatePreferences);
router.get('/dashboard/stats', authenticateToken, userController.getDashboardStats);

module.exports = router;
