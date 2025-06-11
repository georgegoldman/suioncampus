import React from 'react';
import { useNavigate } from "react-router-dom";


const MentorshipDetail = () => {
        const navigate = useNavigate();

    const handleClick = () => {
        navigate("/mentorship-form");
    }
  return (
    <div className="min-h-screen  from-indigo-500 via-purple-600 to-purple-800 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/12 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/5 right-1/12 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/5 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-md-5 px-2 py-10 relative z-10">
        {/* Hero Section */}
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center mb-10 shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-screen-md mx-auto">
  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-fade-in">
    Sui on Campus Mentorship Program
  </h1>
  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
    A structured initiative designed to guide and nurture top talents students and young innovators.
  </p>
</div>


        {/* Program Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center  font-bold text-xl mr-4">
                ⏱
              </div>
              <h3 className="text-2xl font-semibold text-purple-700">Duration</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              8-week intensive program running on a cohort basis, providing focused mentorship and hands-on experience.
            </p>
          </div>

          <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center  font-bold text-xl mr-4">
                👥
              </div>
              <h3 className="text-2xl font-semibold text-purple-700">Structure</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Cohort-based learning environment fostering collaboration and peer-to-peer knowledge sharing.
            </p>
          </div>

          <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center  font-bold text-xl mr-4">
                🎯
              </div>
              <h3 className="text-2xl font-semibold text-purple-700">Focus</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Real-world application with mentorship from industry experts and Sui ecosystem contributors.
            </p>
          </div>
        </div>

        {/* Tracks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-10 text-center shadow-2xl hover:shadow-3xl hover:-translate-y-4 hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <h3 className="text-3xl font-bold text-purple-700 mb-4">Business Track</h3>
            <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600  px-6 py-2 rounded-full text-sm font-medium mb-6">
              Project-Based
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Focus on practical business skills including marketing, sales, product development, and strategic planning. 
              Work collaboratively on real-world business problems and challenges.
            </p>
          </div>

          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-10 text-center shadow-2xl hover:shadow-3xl hover:-translate-y-4 hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <h3 className="text-3xl font-bold text-purple-700 mb-4">Engineering Track</h3>
            <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600  px-6 py-2 rounded-full text-sm font-medium mb-6">
              Individualistic
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Deep dive into technical development with personalized mentorship. Master the Sui development stack 
              and contribute to open-source ecosystem tools.
            </p>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-12 mb-10 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-purple-700 mb-12">
            Program Goals for Mentees
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-indigo-500 hover:translate-x-2 transition-all duration-300 relative group">
              <div className="absolute -top-4 left-6 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center  font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold text-purple-700 mb-3 mt-2">Master Sui Development Stack</h4>
              <p className="text-gray-600 leading-relaxed">
                Gain proficiency in Move language, Sui framework, Sui CLI, and Sui SDKs through hands-on practice and expert guidance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-indigo-500 hover:translate-x-2 transition-all duration-300 relative group">
              <div className="absolute -top-4 left-6 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center  font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold text-purple-700 mb-3 mt-2">Real-World Contributions</h4>
              <p className="text-gray-600 leading-relaxed">
                Contribute to actual Sui projects or develop open-source tools that benefit the broader Sui ecosystem.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-indigo-500 hover:translate-x-2 transition-all duration-300 relative group">
              <div className="absolute -top-4 left-6 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center  font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold text-purple-700 mb-3 mt-2">Business Skills Development</h4>
              <p className="text-gray-600 leading-relaxed">
                Learn essential business skills including marketing strategies, sales processes, product development, and strategic planning.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-indigo-500 hover:translate-x-2 transition-all duration-300 relative group">
              <div className="absolute -top-4 left-6 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center  font-bold">
                4
              </div>
              <h4 className="text-xl font-semibold text-purple-700 mb-3 mt-2">Problem-Solving Experience</h4>
              <p className="text-gray-600 leading-relaxed">
                Tackle real-world business challenges and develop practical solutions with mentorship and collaborative support.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-xl text-opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're looking to learn or share your expertise, we have opportunities for both mentees and mentors.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
            onClick={handleClick}
            className="group text-white bg-gradient-to-r from-indigo-500 to-purple-600  px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform hover:scale-105 min-w-[200px]">
              <span className="flex items-center justify-center">
                Apply as Mentee
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
            </button>
            
            <button className="group bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform hover:scale-105 border-2 border-white hover:bg-purple-50 min-w-[200px]">
              <span className="flex items-center justify-center">
                Apply as Mentor
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </span>
            </button>
          </div>
          
          <div className="mt-8  text-opacity-80 text-sm">
            <p>Questions about the program? <a href="#contact" className="underline hover: transition-colors">Contact us</a></p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MentorshipDetail;