import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { careerService } from '../../services/careerService';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/careers?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Your Career Journey Starts Here</h1>
          <p className="text-xl mb-8 text-gray-200">AI-powered career guidance to bridge the gap between education and employment</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers, skills, industries..."
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#10B981] hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Search
            </button>
          </form>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleStartAssessment}
              className="bg-[#10B981] hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              🎯 Find My Career Path
            </button>
            <button
              onClick={() => navigate('/bursaries')}
              className="bg-white hover:bg-gray-100 text-[#0F172A] px-8 py-3 rounded-lg font-semibold transition"
            >
              💰 Find Bursaries
            </button>
            <button
              onClick={() => navigate('/internships')}
              className="bg-white hover:bg-gray-100 text-[#0F172A] px-8 py-3 rounded-lg font-semibold transition"
            >
              💼 Find Internships
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F172A]">Why Choose Career Bridge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-[#0F172A]">AI Career Recommendations</h3>
              <p className="text-gray-700">Get personalized career suggestions based on your interests, skills, and academic performance.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2 text-[#0F172A]">Salary & Market Insights</h3>
              <p className="text-gray-700">Explore salary ranges, job market trends, and demand levels for different careers in South Africa.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2 text-[#0F172A]">Study Planning</h3>
              <p className="text-gray-700">Create personalized study plans with weekly schedules and progress tracking.</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2 text-[#0F172A]">Application Support</h3>
              <p className="text-gray-700">Get help with university and college applications, document tracking, and eligibility checking.</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-2 text-[#0F172A]">Bursaries & Internships</h3>
              <p className="text-gray-700">Search and apply for bursaries and internship opportunities tailored to your career goals.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-bold mb-2 text-[#0F172A]">Application Email Generator</h3>
              <p className="text-gray-700">Generate professional application emails with AI assistance for job and internship applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2563EB] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Career?</h2>
          <p className="text-xl mb-8">Join thousands of South African learners already using Career Bridge</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#10B981] hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
