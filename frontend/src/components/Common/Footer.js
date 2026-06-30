import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-gray-300 mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Career Bridge</h3>
            <p className="text-sm">Empowering South African learners with AI-powered career guidance.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/careers" className="hover:text-[#10B981]">Careers</a></li>
              <li><a href="/bursaries" className="hover:text-[#10B981]">Bursaries</a></li>
              <li><a href="/internships" className="hover:text-[#10B981]">Internships</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#10B981]">Help Center</a></li>
              <li><a href="#" className="hover:text-[#10B981]">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#10B981]">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#10B981]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#10B981]">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Career Bridge. All rights reserved. Built with ❤️ for South African Career Seekers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
