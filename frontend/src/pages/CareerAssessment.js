import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { careerService } from '../services/careerService';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { PROVINCES } from '../config/constants';

const CareerAssessment = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    subjects: [],
    subjectMarks: [],
    apsScore: '',
    interests: [],
    skills: [],
    workEnvironment: ''
  });

  const [error, setError] = useState('');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Afrikaans', 'History', 'Geography', 'Economics'];
  const interestsList = ['Technology', 'Business', 'Healthcare', 'Education', 'Engineering', 'Arts', 'Science', 'Law'];
  const skillsList = ['Problem-solving', 'Communication', 'Leadership', 'Creativity', 'Analysis', 'Programming', 'Writing', 'Research'];
  const environments = ['Office', 'Remote', 'Field/Outdoors', 'Mixed', 'Laboratory'];

  const handleToggleItem = (item, category) => {
    setFormData(prev => {
      const items = prev[category];
      if (items.includes(item)) {
        return { ...prev, [category]: items.filter(i => i !== item) };
      } else {
        return { ...prev, [category]: [...items, item] };
      }
    });
  };

  const handleAddSubject = (subject) => {
    if (!formData.subjects.includes(subject)) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, subject],
        subjectMarks: [...prev.subjectMarks, 0]
      }));
    }
  };

  const handleMarkChange = (index, value) => {
    const marks = [...formData.subjectMarks];
    marks[index] = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, subjectMarks: marks }));
  };

  const handleRemoveSubject = (index) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
      subjectMarks: prev.subjectMarks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.subjects.length || !formData.interests.length || !formData.skills.length) {
        setError('Please complete all required fields');
        setLoading(false);
        return;
      }

      const response = await careerService.getRecommendations(formData);
      navigate('/assessment-results', { state: { recommendations: response.data.recommendations } });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-lg mb-4">Please login to complete the career assessment</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner message="Analyzing your profile..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-[#0F172A]">Career Assessment</h1>
          <p className="text-gray-600 mb-8">Step {step} of 4 - Answer questions to get personalized career recommendations</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Subjects */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Select Your Subjects</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {subjects.map(subject => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleAddSubject(subject)}
                      className={`p-3 rounded-lg border-2 transition ${
                        formData.subjects.includes(subject)
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-semibold'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>

                {formData.subjects.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold mb-4 text-[#0F172A]">Enter Your Marks (0-100)</h3>
                    <div className="space-y-3">
                      {formData.subjects.map((subject, index) => (
                        <div key={subject} className="flex items-center gap-4">
                          <span className="font-semibold text-gray-700 w-32">{subject}</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.subjectMarks[index]}
                            onChange={(e) => handleMarkChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563EB]"
                            placeholder="Enter mark"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSubject(index)}
                            className="text-red-500 hover:text-red-700 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: APS Score & Environment */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Your Academic Profile</h2>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">APS Score (0-45)</label>
                  <input
                    type="number"
                    min="0"
                    max="45"
                    value={formData.apsScore}
                    onChange={(e) => setFormData(prev => ({ ...prev, apsScore: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563EB]"
                    placeholder="Enter your APS score"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-4 text-[#0F172A]">Preferred Work Environment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {environments.map(env => (
                      <button
                        key={env}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, workEnvironment: env }))}
                        className={`p-3 rounded-lg border-2 transition text-left ${
                          formData.workEnvironment === env
                            ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-semibold'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {env}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Your Interests</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interestsList.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleToggleItem(interest, 'interests')}
                      className={`p-3 rounded-lg border-2 transition ${
                        formData.interests.includes(interest)
                          ? 'border-[#10B981] bg-green-50 text-[#10B981] font-semibold'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Your Key Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skillsList.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleItem(skill, 'skills')}
                      className={`p-3 rounded-lg border-2 transition ${
                        formData.skills.includes(skill)
                          ? 'border-[#10B981] bg-green-50 text-[#10B981] font-semibold'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                disabled={step === 1}
                className="bg-gray-400 hover:bg-gray-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {step === 4 ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#10B981] hover:bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  {loading ? 'Submitting...' : 'Get Recommendations'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(prev => Math.min(4, prev + 1))}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareerAssessment;
