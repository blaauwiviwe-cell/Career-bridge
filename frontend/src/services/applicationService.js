import api from './api';

export const applicationService = {
  createApplication: (data) => api.post('/applications', data),
  getUserApplications: () => api.get('/applications'),
  getApplicationDetails: (id) => api.get(`/applications/${id}`),
  updateApplication: (id, data) => api.put(`/applications/${id}`, data),
  deleteApplication: (id) => api.delete(`/applications/${id}`),
  uploadDocument: (applicationId, formData) =>
    api.post(`/applications/${applicationId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  getDocuments: (applicationId) =>
    api.get(`/applications/${applicationId}/documents`),
  getRequiredDocuments: (applicationId) =>
    api.get(`/applications/${applicationId}/documents/required`),
  checkEligibility: (applicationId, data) =>
    api.post(`/applications/${applicationId}/eligibility`, data),
  getApplicationChecklist: (applicationId) =>
    api.get(`/applications/${applicationId}/checklist`),
  updateChecklist: (applicationId, checklist) =>
    api.put(`/applications/${applicationId}/checklist`, { checklist })
};
