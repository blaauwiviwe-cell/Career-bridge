import api from './api';

export const aiService = {
  generateApplicationEmail: (emailData) =>
    api.post('/ai/generate-email', emailData),
  getStudyTips: (subject, currentMark) =>
    api.post('/ai/study-tips', { subject, currentMark }),
  getCareerInsights: (careerName) =>
    api.post('/ai/career-insights', { careerName })
};
