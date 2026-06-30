const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');
const { authenticateToken } = require('../middleware/auth');
const { paginationValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', paginationValidation, validate, internshipController.searchInternships);
router.get('/:id', internshipController.getInternshipDetails);

// Protected routes
router.post('/:id/save', authenticateToken, internshipController.saveInternship);
router.delete('/saved/:id', authenticateToken, internshipController.removeSavedInternship);
router.get('/user/saved', authenticateToken, internshipController.getSavedInternships);

module.exports = router;
