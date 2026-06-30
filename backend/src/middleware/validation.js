const { body, query, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules
const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('surname').trim().notEmpty().withMessage('Surname is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('age').optional().isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const careerAssessmentValidation = [
  body('subjects').isArray().withMessage('Subjects must be an array'),
  body('subjectMarks').isArray().withMessage('Subject marks must be an array'),
  body('apsScore').isInt({ min: 0, max: 100 }).withMessage('APS score must be between 0 and 100')
];

const studyPlanValidation = [
  body('careerGoal').trim().notEmpty().withMessage('Career goal is required'),
  body('subjects').isArray().withMessage('Subjects must be an array'),
  body('availableHours').isInt({ min: 1 }).withMessage('Available hours must be positive')
];

const applicationValidation = [
  body('institution').trim().notEmpty().withMessage('Institution is required'),
  body('course').trim().notEmpty().withMessage('Course is required')
];

const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  careerAssessmentValidation,
  studyPlanValidation,
  applicationValidation,
  paginationValidation
};
