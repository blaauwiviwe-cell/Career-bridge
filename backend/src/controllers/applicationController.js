const pool = require('../config/database');
const { REQUIRED_DOCUMENTS } = require('../config/constants');
const multer = require('multer');
const path = require('path');

// File upload configuration
const storage = multer.diskStorage({
  destination: process.env.UPLOAD_DIR || './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const createApplication = async (req, res, next) => {
  try {
    const { institution, course, applicationDeadline } = req.body;

    const [result] = await pool.query(
      'INSERT INTO applications (userId, institution, course, applicationDeadline) VALUES (?, ?, ?, ?)',
      [req.user.userId, institution, course, applicationDeadline]
    );

    const applicationId = result.insertId;

    // Create application checklist
    const checklist = REQUIRED_DOCUMENTS.map(doc => ({
      document: doc,
      completed: false
    }));

    await pool.query(
      'INSERT INTO applicationChecklists (applicationId, checklist) VALUES (?, ?)',
      [applicationId, JSON.stringify(checklist)]
    );

    res.status(201).json({
      message: 'Application created successfully',
      applicationId
    });
  } catch (error) {
    next(error);
  }
};

const getUserApplications = async (req, res, next) => {
  try {
    const [applications] = await pool.query(
      'SELECT * FROM applications WHERE userId = ? ORDER BY createdAt DESC',
      [req.user.userId]
    );
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

const getApplicationDetails = async (req, res, next) => {
  try {
    const [applications] = await pool.query(
      'SELECT * FROM applications WHERE id = ? AND userId = ?',
      [req.params.id, req.user.userId]
    );

    if (applications.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const application = applications[0];

    // Get documents
    const [documents] = await pool.query(
      'SELECT * FROM documents WHERE applicationId = ?',
      [req.params.id]
    );

    // Get checklist
    const [checklists] = await pool.query(
      'SELECT * FROM applicationChecklists WHERE applicationId = ?',
      [req.params.id]
    );

    res.json({
      ...application,
      documents,
      checklist: checklists[0]
    });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const { status } = req.body;

    const [result] = await pool.query(
      'UPDATE applications SET status = ? WHERE id = ? AND userId = ?',
      [status, req.params.id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM applications WHERE id = ? AND userId = ?',
      [req.params.id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { documentType } = req.body;
    const filePath = `/uploads/${req.file.filename}`;

    const [result] = await pool.query(
      'INSERT INTO documents (applicationId, documentType, uploadStatus, filePath) VALUES (?, ?, ?, ?)',
      [req.params.applicationId, documentType, 'Uploaded', filePath]
    );

    res.status(201).json({
      message: 'Document uploaded successfully',
      documentId: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

const getDocuments = async (req, res, next) => {
  try {
    const [documents] = await pool.query(
      'SELECT * FROM documents WHERE applicationId = ?',
      [req.params.applicationId]
    );
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

const getRequiredDocuments = async (req, res, next) => {
  try {
    res.json({ requiredDocuments: REQUIRED_DOCUMENTS });
  } catch (error) {
    next(error);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM documents WHERE id = ?',
      [req.params.documentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const checkEligibility = async (req, res, next) => {
  try {
    const { studentMarks, apsScore } = req.body;
    const { applicationId } = req.params;

    // Get application details
    const [applications] = await pool.query(
      'SELECT * FROM applications WHERE id = ?',
      [applicationId]
    );

    if (applications.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check eligibility logic (simplified)
    const eligible = apsScore >= 24; // Minimum APS for most courses

    // Save eligibility check
    await pool.query(
      'INSERT INTO eligibilityChecks (applicationId, courseRequirements, studentResults, eligible) VALUES (?, ?, ?, ?)',
      [applicationId, JSON.stringify({}), JSON.stringify(studentMarks), eligible]
    );

    res.json({
      eligible,
      message: eligible ? 'You are eligible for this course' : 'You do not meet the minimum requirements'
    });
  } catch (error) {
    next(error);
  }
};

const getEligibilityResult = async (req, res, next) => {
  try {
    const [checks] = await pool.query(
      'SELECT * FROM eligibilityChecks WHERE applicationId = ? ORDER BY checkedAt DESC LIMIT 1',
      [req.params.applicationId]
    );

    if (checks.length === 0) {
      return res.status(404).json({ error: 'No eligibility check found' });
    }

    res.json(checks[0]);
  } catch (error) {
    next(error);
  }
};

const getApplicationChecklist = async (req, res, next) => {
  try {
    const [checklists] = await pool.query(
      'SELECT * FROM applicationChecklists WHERE applicationId = ?',
      [req.params.applicationId]
    );

    if (checklists.length === 0) {
      return res.status(404).json({ error: 'Checklist not found' });
    }

    res.json(checklists[0]);
  } catch (error) {
    next(error);
  }
};

const updateChecklist = async (req, res, next) => {
  try {
    const { checklist } = req.body;

    await pool.query(
      'UPDATE applicationChecklists SET checklist = ?, completionPercentage = ? WHERE applicationId = ?',
      [JSON.stringify(checklist), calculateCompletion(checklist), req.params.applicationId]
    );

    res.json({ message: 'Checklist updated successfully' });
  } catch (error) {
    next(error);
  }
};

const calculateCompletion = (checklist) => {
  if (!checklist || checklist.length === 0) return 0;
  const completed = checklist.filter(item => item.completed).length;
  return Math.round((completed / checklist.length) * 100);
};

module.exports = {
  createApplication,
  getUserApplications,
  getApplicationDetails,
  updateApplication,
  deleteApplication,
  uploadDocument,
  getDocuments,
  getRequiredDocuments,
  deleteDocument,
  checkEligibility,
  getEligibilityResult,
  getApplicationChecklist,
  updateChecklist
};
