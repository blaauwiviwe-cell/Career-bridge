const pool = require('../config/database');

const searchBursaries = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM bursaries WHERE 1=1';
    const params = [];

    if (req.query.fieldOfStudy) {
      query += ' AND fieldOfStudy = ?';
      params.push(req.query.fieldOfStudy);
    }

    if (req.query.province) {
      query += ' AND province = ?';
      params.push(req.query.province);
    }

    if (req.query.minGrade) {
      query += ' AND gradeAverage <= ?';
      params.push(parseFloat(req.query.minGrade));
    }

    // Count total
    const [countResult] = await pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*) as total'),
      params
    );
    const total = countResult[0].total;

    // Get paginated results
    const [bursaries] = await pool.query(
      query + ' ORDER BY closingDate ASC LIMIT ? OFFSET ?',
      [...params, limit, offset]
    );

    res.json({
      data: bursaries,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    next(error);
  }
};

const getBursaryDetails = async (req, res, next) => {
  try {
    const [bursaries] = await pool.query('SELECT * FROM bursaries WHERE id = ?', [req.params.id]);
    if (bursaries.length === 0) {
      return res.status(404).json({ error: 'Bursary not found' });
    }
    res.json(bursaries[0]);
  } catch (error) {
    next(error);
  }
};

const saveBursary = async (req, res, next) => {
  try {
    await pool.query(
      'INSERT INTO savedBursaries (userId, bursaryId) VALUES (?, ?)',
      [req.user.userId, req.params.id]
    );
    res.status(201).json({ message: 'Bursary saved successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Bursary already saved' });
    }
    next(error);
  }
};

const getSavedBursaries = async (req, res, next) => {
  try {
    const [bursaries] = await pool.query(
      'SELECT b.* FROM bursaries b JOIN savedBursaries sb ON b.id = sb.bursaryId WHERE sb.userId = ? ORDER BY sb.savedAt DESC',
      [req.user.userId]
    );
    res.json(bursaries);
  } catch (error) {
    next(error);
  }
};

const removeSavedBursary = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM savedBursaries WHERE userId = ? AND bursaryId = ?',
      [req.user.userId, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Saved bursary not found' });
    }
    res.json({ message: 'Bursary removed from saved' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchBursaries,
  getBursaryDetails,
  saveBursary,
  getSavedBursaries,
  removeSavedBursary
};
