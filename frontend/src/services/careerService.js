import api from './api';

export const careerService = {
  getAllCareers: (page = 1, limit = 10, filters = {}) =>
    api.get('/careers', { params: { page, limit, ...filters } }),
  getCareerDetails: (id) => api.get(`/careers/${id}`),
  getRecommendations: (assessmentData) =>
    api.post('/careers/recommendations', assessmentData),
  getHighDemandCareers: () => api.get('/careers/market/high-demand'),
  getMarketTrends: () => api.get('/careers/market/trends'),
  getSalaryInsights: (careerName, province) =>
    api.get(`/careers/${careerName}/salary`, { params: { province } })
};
