import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#0F172A] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-[#10B981]">🎓</span> Career Bridge
        </h1>
        <p className="text-gray-300 text-sm">Bridging the Gap Between Education and Employment</p>
      </div>
    </header>
  );
};

export default Header;
