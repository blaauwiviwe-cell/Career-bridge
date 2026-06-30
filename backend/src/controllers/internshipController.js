const pool = require('../config/database');

const searchInternships = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM internships WHERE 1=1';
    const params = [];

    if (req.query.industry) {
      query += ' AND industry = ?';
      params.push(req.query.industry);
    }

    if (req.query.province) {
      query += ' AND province = ?';
      params.push(req.query.province);
    }

    // Count total
    const [countResult] = await pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*) as total'),
      params
    );
    const total = countResult[0].total;

    // Get paginated results
    const [internships] = await pool.query(
      query + ' ORDER BY closingDate ASC LIMIT ? OFFSET ?',
      [...params, limit, offset]
    );

    res.json({
      data: internships,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    next(error);
  }
};

const getInternshipDetails = async (req, res, next) => {
  try {
    const [internships] = await pool.query('SELECT * FROM internships WHERE id = ?', [req.params.id]);
    if (internships.length === 0) {
      return res.status(404).json({ error: 'Internship not found' });
    }
    res.json(internships[0]);
  } catch (error) {
    next(error);
  }
};

const saveInternship = async (req, res, next) => {
  try {
    await pool.query(
      'INSERT INTO savedInternships (userId, internshipId) VALUES (?, ?)',
      [req.user.userId, req.params.id]
    );
    res.status(201).json({ message: 'Internship saved successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Internship already saved' });
    }
    next(error);
  }
};

const getSavedInternships = async (req, res, next) => {
  try {
    const [internships] = await pool.query(
      'SELECT i.* FROM internships i JOIN savedInternships si ON i.id = si.internshipId WHERE si.userId = ? ORDER BY si.savedAt DESC',
      [req.user.userId]
    );
    res.json(internships);
  } catch (error) {
    next(error);
  }
};

const removeSavedInternship = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM savedInternships WHERE userId = ? AND internshipId = ?',
      [req.user.userId, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Saved internship not found' });
    }
    res.json({ message: 'Internship removed from saved' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchInternships,
  getInternshipDetails,
  saveInternship,
  getSavedInternships,
  removeSavedInternship
};
