const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authenticateToken } = require('../middleware/auth');
const { applicationValidation, validate } = require('../middleware/validation');

// Protected routes
router.post('/', authenticateToken, applicationValidation, validate, applicationController.createApplication);
router.get('/', authenticateToken, applicationController.getUserApplications);
router.get('/:id', authenticateToken, applicationController.getApplicationDetails);
router.put('/:id', authenticateToken, applicationController.updateApplication);
router.delete('/:id', authenticateToken, applicationController.deleteApplication);

// Document routes
router.post('/:applicationId/documents', authenticateToken, applicationController.uploadDocument);
router.get('/:applicationId/documents', authenticateToken, applicationController.getDocuments);
router.get('/:applicationId/documents/required', applicationController.getRequiredDocuments);
router.delete('/documents/:documentId', authenticateToken, applicationController.deleteDocument);

// Eligibility routes
router.post('/:applicationId/eligibility', authenticateToken, applicationController.checkEligibility);
router.get('/:applicationId/eligibility', authenticateToken, applicationController.getEligibilityResult);

// Checklist routes
router.get('/:applicationId/checklist', authenticateToken, applicationController.getApplicationChecklist);
router.put('/:applicationId/checklist', authenticateToken, applicationController.updateChecklist);

module.exports = router;
