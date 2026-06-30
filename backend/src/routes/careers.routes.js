const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const { authenticateToken } = require('../middleware/auth');
const { careerAssessmentValidation, paginationValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', paginationValidation, validate, careerController.getAllCareers);
router.get('/market/high-demand', careerController.getHighDemandCareers);
router.get('/market/trends', careerController.getMarketTrends);
router.get('/:id', careerController.getCareerDetails);
router.get('/:careerName/salary', careerController.getSalaryInsights);

// Protected routes
router.post('/recommendations', authenticateToken, careerAssessmentValidation, validate, careerController.getRecommendations);

module.exports = router;
