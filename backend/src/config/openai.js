const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateCareerRecommendations = async (assessmentData) => {
  try {
    const prompt = `Based on the following assessment data, provide 3-5 suitable career recommendations for a South African student:

Subjects: ${assessmentData.subjects.join(', ')}
Marks: ${assessmentData.subjectMarks.join(', ')}
APS Score: ${assessmentData.apsScore}
Interests: ${assessmentData.interests.join(', ')}
Skills: ${assessmentData.skills.join(', ')}
Preferred Work Environment: ${assessmentData.workEnvironment}

For each recommendation, provide:
1. Career name
2. Why it suits this student
3. Required qualifications
4. Typical starting salary in South Africa
5. Job market demand (High/Medium/Low)

Format as JSON array.`;

    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    throw error;
  }
};

const generateStudyPlan = async (planData) => {
  try {
    const prompt = `Create a detailed weekly study plan for a South African student with the following details:

Career Goal: ${planData.careerGoal}
Subjects: ${planData.subjects.join(', ')}
Current Marks: ${planData.currentMarks.join(', ')}
Available Study Hours per Week: ${planData.availableHours}

Provide a comprehensive study plan that includes:
1. Weekly breakdown (Monday to Sunday)
2. Time allocation per subject
3. Study techniques and resources
4. Progress tracking milestones
5. Exam preparation timeline
6. Tips for improvement

Format as detailed JSON structure.`;

    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating study plan:', error);
    throw error;
  }
};

const generateApplicationEmail = async (emailData) => {
  try {
    const prompt = `Write a professional application email for a South African job applicant with the following details:

Applicant Name: ${emailData.name}
Company: ${emailData.company}
Position: ${emailData.position}
Qualification: ${emailData.qualification}

The email should:
1. Be professional and concise
2. Highlight relevant skills
3. Show enthusiasm for the role
4. Include a clear call to action
5. Be suitable for South African context

Return only the email body without subject line.`;

    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating email:', error);
    throw error;
  }
};

module.exports = {
  openai,
  generateCareerRecommendations,
  generateStudyPlan,
  generateApplicationEmail
};
