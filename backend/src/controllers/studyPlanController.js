const pool = require('../config/database');
const { generateStudyPlan } = require('../config/openai');

const generateStudyPlan = async (req, res, next) => {
  try {
    const { careerGoal, subjects, currentMarks, availableHours } = req.body;

    // Generate AI study plan
    const planData = { careerGoal, subjects, currentMarks, availableHours };
    const weeklyPlan = await generateStudyPlan(planData);

    // Save study plan
    const [result] = await pool.query(
      'INSERT INTO studyPlans (userId, careerGoal, subjects, currentMarks, availableHours, weeklyPlan) VALUES (?, ?, ?, ?, ?, ?)',
      [
        req.user.userId,
        careerGoal,
        JSON.stringify(subjects),
        JSON.stringify(currentMarks),
        availableHours,
        JSON.stringify(weeklyPlan)
      ]
    );

    res.status(201).json({
      message: 'Study plan generated successfully',
      studyPlanId: result.insertId,
      weeklyPlan
    });
  } catch (error) {
    next(error);
  }
};

const getUserStudyPlans = async (req, res, next) => {
  try {
    const [plans] = await pool.query(
      'SELECT id, careerGoal, subjects, availableHours, createdAt FROM studyPlans WHERE userId = ? ORDER BY createdAt DESC',
      [req.user.userId]
    );
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

const getStudyPlanDetails = async (req, res, next) => {
  try {
    const [plans] = await pool.query(
      'SELECT * FROM studyPlans WHERE id = ? AND userId = ?',
      [req.params.id, req.user.userId]
    );

    if (plans.length === 0) {
      return res.status(404).json({ error: 'Study plan not found' });
    }

    res.json(plans[0]);
  } catch (error) {
    next(error);
  }
};

const updateStudyPlan = async (req, res, next) => {
  try {
    const { weeklyPlan, progressTracking } = req.body;

    await pool.query(
      'UPDATE studyPlans SET weeklyPlan = ?, progressTracking = ? WHERE id = ? AND userId = ?',
      [JSON.stringify(weeklyPlan), JSON.stringify(progressTracking), req.params.id, req.user.userId]
    );

    res.json({ message: 'Study plan updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteStudyPlan = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM studyPlans WHERE id = ? AND userId = ?',
      [req.params.id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Study plan not found' });
    }

    res.json({ message: 'Study plan deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const { progressTracking } = req.body;

    await pool.query(
      'UPDATE studyPlans SET progressTracking = ? WHERE id = ? AND userId = ?',
      [JSON.stringify(progressTracking), req.params.id, req.user.userId]
    );

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateStudyPlan,
  getUserStudyPlans,
  getStudyPlanDetails,
  updateStudyPlan,
  deleteStudyPlan,
  updateProgress
};
