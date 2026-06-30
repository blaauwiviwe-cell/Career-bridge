import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#2563EB] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
        <Link to="/" className="font-bold text-xl hover:text-[#10B981]">
          Career Bridge
        </Link>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-[#10B981]">Dashboard</Link>
              <Link to="/careers" className="hover:text-[#10B981]">Careers</Link>
              <Link to="/bursaries" className="hover:text-[#10B981]">Bursaries</Link>
              <Link to="/internships" className="hover:text-[#10B981]">Internships</Link>
              <div className="flex items-center gap-3">
                <span className="text-sm">Hi, {user?.firstName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#10B981]">Login</Link>
              <Link to="/register" className="bg-[#10B981] hover:bg-green-600 px-4 py-2 rounded text-white font-semibold">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
