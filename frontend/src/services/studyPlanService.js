import api from './api';

export const studyPlanService = {
  generateStudyPlan: (data) => api.post('/studyplans/generate', data),
  getUserStudyPlans: () => api.get('/studyplans'),
  getStudyPlanDetails: (id) => api.get(`/studyplans/${id}`),
  updateStudyPlan: (id, data) => api.put(`/studyplans/${id}`, data),
  deleteStudyPlan: (id) => api.delete(`/studyplans/${id}`),
  updateProgress: (id, progress) => api.put(`/studyplans/${id}/progress`, { progressTracking: progress })
};
