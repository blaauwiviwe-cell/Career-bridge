const pool = require('../config/database');
const { generateCareerRecommendations } = require('../config/openai');

const getAllCareers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM careers WHERE 1=1';
    const params = [];

    if (req.query.industry) {
      query += ' AND industry = ?';
      params.push(req.query.industry);
    }

    if (req.query.demandLevel) {
      query += ' AND demandLevel = ?';
      params.push(req.query.demandLevel);
    }

    // Get total count
    const [countResult] = await pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*) as total'),
      params
    );
    const total = countResult[0].total;

    // Get paginated results
    const [careers] = await pool.query(
      query + ' LIMIT ? OFFSET ?',
      [...params, limit, offset]
    );

    res.json({
      data: careers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getCareerDetails = async (req, res, next) => {
  try {
    const [careers] = await pool.query('SELECT * FROM careers WHERE id = ?', [req.params.id]);
    if (careers.length === 0) {
      return res.status(404).json({ error: 'Career not found' });
    }
    res.json(careers[0]);
  } catch (error) {
    next(error);
  }
};

const getRecommendations = async (req, res, next) => {
  try {
    const { subjects, subjectMarks, apsScore, interests, skills, workEnvironment } = req.body;

    // Save assessment to database
    const [result] = await pool.query(
      'INSERT INTO careerAssessments (userId, subjects, subjectMarks, apsScore, interests, skills, workEnvironment) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        req.user.userId,
        JSON.stringify(subjects),
        JSON.stringify(subjectMarks),
        apsScore,
        interests.join(', '),
        skills.join(', '),
        workEnvironment
      ]
    );

    // Generate AI recommendations
    const assessmentData = { subjects, subjectMarks, apsScore, interests, skills, workEnvironment };
    const recommendations = await generateCareerRecommendations(assessmentData);

    // Update assessment with recommendations
    await pool.query(
      'UPDATE careerAssessments SET recommendedCareers = ? WHERE id = ?',
      [JSON.stringify(recommendations), result.insertId]
    );

    res.json({
      assessmentId: result.insertId,
      recommendations
    });
  } catch (error) {
    next(error);
  }
};

const getHighDemandCareers = async (req, res, next) => {
  try {
    const [careers] = await pool.query(
      'SELECT * FROM careers WHERE demandLevel IN ("High", "Very High") ORDER BY demandLevel DESC LIMIT 20'
    );
    res.json(careers);
  } catch (error) {
    next(error);
  }
};

const getSalaryInsights = async (req, res, next) => {
  try {
    const { careerName } = req.params;
    const province = req.query.province || 'Gauteng';

    const [salaryData] = await pool.query(
      'SELECT * FROM salaryData WHERE careerName = ? AND province = ? ORDER BY year DESC LIMIT 1',
      [careerName, province]
    );

    if (salaryData.length === 0) {
      return res.status(404).json({ error: 'Salary data not found' });
    }

    res.json(salaryData[0]);
  } catch (error) {
    next(error);
  }
};

const getMarketTrends = async (req, res, next) => {
  try {
    const [trends] = await pool.query(
      'SELECT industry, COUNT(*) as count, AVG(salaryMax) as avgSalary FROM careers GROUP BY industry'
    );
    res.json(trends);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCareers,
  getCareerDetails,
  getRecommendations,
  getHighDemandCareers,
  getSalaryInsights,
  getMarketTrends
};
