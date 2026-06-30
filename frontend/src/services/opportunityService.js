import api from './api';

export const bursaryService = {
  searchBursaries: (params) => api.get('/bursaries', { params }),
  getBursaryDetails: (id) => api.get(`/bursaries/${id}`),
  saveBursary: (id) => api.post(`/bursaries/${id}/save`),
  getSavedBursaries: () => api.get('/bursaries/user/saved'),
  removeSavedBursary: (id) => api.delete(`/bursaries/saved/${id}`)
};

export const internshipService = {
  searchInternships: (params) => api.get('/internships', { params }),
  getInternshipDetails: (id) => api.get(`/internships/${id}`),
  saveInternship: (id) => api.post(`/internships/${id}/save`),
  getSavedInternships: () => api.get('/internships/user/saved'),
  removeSavedInternship: (id) => api.delete(`/internships/saved/${id}`)
};
