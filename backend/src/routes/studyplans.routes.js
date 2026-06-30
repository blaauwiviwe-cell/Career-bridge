const express = require('express');
const router = express.Router();
const studyPlanController = require('../controllers/studyPlanController');
const { authenticateToken } = require('../middleware/auth');
const { studyPlanValidation, validate } = require('../middleware/validation');

// Protected routes
router.post('/generate', authenticateToken, studyPlanValidation, validate, studyPlanController.generateStudyPlan);
router.get('/', authenticateToken, studyPlanController.getUserStudyPlans);
router.get('/:id', authenticateToken, studyPlanController.getStudyPlanDetails);
router.put('/:id', authenticateToken, studyPlanController.updateStudyPlan);
router.delete('/:id', authenticateToken, studyPlanController.deleteStudyPlan);
router.put('/:id/progress', authenticateToken, studyPlanController.updateProgress);

module.exports = router;
