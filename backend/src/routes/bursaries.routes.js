const express = require('express');
const router = express.Router();
const bursaryController = require('../controllers/bursaryController');
const { authenticateToken } = require('../middleware/auth');
const { paginationValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', paginationValidation, validate, bursaryController.searchBursaries);
router.get('/:id', bursaryController.getBursaryDetails);

// Protected routes
router.post('/:id/save', authenticateToken, bursaryController.saveBursary);
router.delete('/saved/:id', authenticateToken, bursaryController.removeSavedBursary);
router.get('/user/saved', authenticateToken, bursaryController.getSavedBursaries);

module.exports = router;
