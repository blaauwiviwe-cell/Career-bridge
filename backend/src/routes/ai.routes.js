const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticateToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Protected routes
router.post('/generate-email',
  authenticateToken,
  [
    body('name').trim().notEmpty(),
    body('company').trim().notEmpty(),
    body('position').trim().notEmpty(),
    body('qualification').trim().notEmpty()
  ],
  validate,
  aiController.generateApplicationEmail
);

router.post('/study-tips',
  authenticateToken,
  [
    body('subject').trim().notEmpty(),
    body('currentMark').isInt({ min: 0, max: 100 })
  ],
  validate,
  aiController.getStudyTips
);

router.post('/career-insights',
  authenticateToken,
  [
    body('careerName').trim().notEmpty()
  ],
  validate,
  aiController.getCareerInsights
);

module.exports = router;
