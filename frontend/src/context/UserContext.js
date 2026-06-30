import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [savedCareers, setSavedCareers] = useState([]);
  const [savedBursaries, setSavedBursaries] = useState([]);
  const [savedInternships, setSavedInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [studyPlans, setStudyPlans] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const addSavedCareer = (career) => {
    setSavedCareers(prev => [...prev, career]);
  };

  const removeSavedCareer = (careerId) => {
    setSavedCareers(prev => prev.filter(c => c.id !== careerId));
  };

  const addSavedBursary = (bursary) => {
    setSavedBursaries(prev => [...prev, bursary]);
  };

  const removeSavedBursary = (bursaryId) => {
    setSavedBursaries(prev => prev.filter(b => b.id !== bursaryId));
  };

  const addSavedInternship = (internship) => {
    setSavedInternships(prev => [...prev, internship]);
  };

  const removeSavedInternship = (internshipId) => {
    setSavedInternships(prev => prev.filter(i => i.id !== internshipId));
  };

  return (
    <UserContext.Provider
      value={{
        savedCareers,
        savedBursaries,
        savedInternships,
        applications,
        studyPlans,
        assessmentResults,
        addSavedCareer,
        removeSavedCareer,
        addSavedBursary,
        removeSavedBursary,
        addSavedInternship,
        removeSavedInternship,
        setApplications,
        setStudyPlans,
        setAssessmentResults
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
