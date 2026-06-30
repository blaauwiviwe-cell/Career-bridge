const { generateApplicationEmail } = require('../config/openai');
const pool = require('../config/database');

const generateApplicationEmail = async (req, res, next) => {
  try {
    const { name, company, position, qualification } = req.body;

    // Generate email using OpenAI
    const emailContent = await generateApplicationEmail({
      name,
      company,
      position,
      qualification
    });

    // Save generated email
    await pool.query(
      'INSERT INTO generatedEmails (userId, company, position, emailContent) VALUES (?, ?, ?, ?)',
      [req.user.userId, company, position, emailContent]
    );

    res.json({
      email: emailContent,
      message: 'Email generated successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getStudyTips = async (req, res, next) => {
  try {
    const { subject, currentMark } = req.body;

    const prompt = `Provide 5 specific study tips for a South African student studying ${subject} with current mark of ${currentMark}%. Focus on:
    1. Problem areas to focus on
    2. Study techniques
    3. Resources to use
    4. Time management tips
    5. Exam preparation strategies
    
    Format as a JSON array of objects with 'tip' and 'explanation' fields.`;

    // For now, returning mock data. In production, call OpenAI API
    const tips = [
      {
        tip: 'Practice past exam papers',
        explanation: 'This helps familiarize you with question types and time management'
      },
      {
        tip: 'Form study groups',
        explanation: 'Collaborative learning can improve understanding and retention'
      },
      {
        tip: 'Use active recall',
        explanation: 'Test yourself regularly instead of just re-reading notes'
      },
      {
        tip: 'Create mind maps',
        explanation: 'Visual organization helps with understanding complex concepts'
      },
      {
        tip: 'Schedule regular breaks',
        explanation: 'Study in 25-minute focused sessions with 5-minute breaks'
      }
    ];

    res.json({ tips, subject, currentMark });
  } catch (error) {
    next(error);
  }
};

const getCareerInsights = async (req, res, next) => {
  try {
    const { careerName } = req.body;

    // Get career data from database
    const [careers] = await pool.query(
      'SELECT * FROM careers WHERE name = ?',
      [careerName]
    );

    if (careers.length === 0) {
      return res.status(404).json({ error: 'Career not found' });
    }

    res.json({
      career: careers[0],
      insights: {
        demandOutlook: careers[0].careerGrowth,
        salaryGrowth: 'Competitive',
        skillsInDemand: careers[0].skillsRequired
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateApplicationEmail,
  getStudyTips,
  getCareerInsights
};
