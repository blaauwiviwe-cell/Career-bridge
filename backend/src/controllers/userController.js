const pool = require('../config/database');

const getProfile = async (req, res, next) => {
  try {
    const [users] = await pool.query(
      'SELECT id, firstName, surname, email, phone, age, currentGrade, province, careerInterests, profileCompleted, createdAt FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { firstName, surname, phone, age, currentGrade, province, careerInterests } = req.body;

    await pool.query(
      'UPDATE users SET firstName = ?, surname = ?, phone = ?, age = ?, currentGrade = ?, province = ?, careerInterests = ?, profileCompleted = TRUE WHERE id = ?',
      [firstName, surname, phone, age, currentGrade, province, careerInterests, req.user.userId]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

const updatePreferences = async (req, res, next) => {
  try {
    const { careerInterests } = req.body;

    await pool.query(
      'UPDATE users SET careerInterests = ? WHERE id = ?',
      [careerInterests, req.user.userId]
    );

    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    // Get saved careers count
    const [careerCount] = await pool.query(
      'SELECT COUNT(*) as count FROM careerAssessments WHERE userId = ?',
      [req.user.userId]
    );

    // Get saved bursaries count
    const [bursaryCount] = await pool.query(
      'SELECT COUNT(*) as count FROM savedBursaries WHERE userId = ?',
      [req.user.userId]
    );

    // Get saved internships count
    const [internshipCount] = await pool.query(
      'SELECT COUNT(*) as count FROM savedInternships WHERE userId = ?',
      [req.user.userId]
    );

    // Get applications count
    const [applicationCount] = await pool.query(
      'SELECT COUNT(*) as count FROM applications WHERE userId = ?',
      [req.user.userId]
    );

    res.json({
      assessments: careerCount[0].count,
      savedBursaries: bursaryCount[0].count,
      savedInternships: internshipCount[0].count,
      applications: applicationCount[0].count
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePreferences,
  getDashboardStats
};
