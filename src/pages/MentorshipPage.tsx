import Header from "@/components/Header";
import React from "react";
import { useNavigate } from "react-router-dom";

const MentorshipPage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/mentorship-form");
    }
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-10 lg:px-20 lg:py-20">
                <div className="flex flex-col-reverse lg:flex-row gap-12">
                    {/* Left section - Text content */}
<div className="flex-1 flex items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-12">
  <div className="w-full max-w-3xl">
    <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">
      A Mentorship Framework for Learners
    </p>
    
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary leading-tight mb-6">
      Connect &<br />
      learn from<br />
      the experts
    </h1>
    
<p className="text-lg text-gray-600 mb-8 leading-relaxed">
  Grow your career fast with the right mentor.
</p>


    
    <button className="bg-accent hover:bg-accent-dark text-buttonText font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
    onClick={handleClick}
    >
      Join for free
      <div className="w-6 h-6 bg-buttonText rounded-full flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </div>
    </button>
  </div>
</div>


                    {/* Right section - Visual layout */}
                    <div className="flex-1 flex items-center justify-center min-h-[600px] relative">
                        <div className="relative w-full max-w-md h-[500px] sm:h-[600px] md:h-[650px]">
                            {/* Yellow Circle */}
                            <div className="absolute top-0 left-8 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                <div className="text-center">
                                    <div className="text-lg font-bold">6</div>
                                    <div className="text-xs font-bold">Weeks</div>
                                    <div className="text-xs">Program</div>
                                </div>
                            </div>

                            {/* Small white circle */}
                            <div className="absolute top-2 left-32 w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>

                            {/* Active Professionals card */}
                            <div className="absolute top-8 right-12 bg-black text-white px-4 py-3 rounded-2xl shadow-lg min-w-max">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-xs text-gray-300">Active</span>
                                </div>
                                <div className="text-xs text-gray-300 mb-1">Mentors</div>
                                <div className="text-xl font-bold">50+</div>
                            </div>

                            {/* Purple circle */}
                            <div className="absolute top-4 right-0 w-20 h-20 bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
                                <div className="text-center">
                                    <div className="text-sm font-bold">Business</div>
                                    <div className="text-xs">Track</div>
                                </div>
                            </div>

                            {/* Blue rectangle */}
                            <div className="absolute top-20 left-0 w-32 h-40 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
                                <div className="text-center text-white">
                                    <div className="text-sm font-bold mb-1">Engineering</div>
                                    <div className="text-xs mb-2">Track</div>
                                    <div className="text-xs">Move Development</div>
                                    <div className="text-xs">dApp Building</div>
                                </div>
                            </div>

                            {/* Star */}
                            <div className="absolute top-32 left-40 transform -translate-x-1/2 -translate-y-1/2">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="text-gray-800">
                                    <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" fill="currentColor" />
                                </svg>
                            </div>

                            {/* Yellow quarter circle */}
                            <div className="absolute top-40 right-8 w-16 h-16 bg-yellow-400 rounded-tl-full shadow-lg"></div>

                            {/* Green card */}
                            <div className="absolute bottom-12 left-4 bg-green-400 text-white px-4 py-3 rounded-2xl shadow-lg min-w-max">
                                <div className="text-xs text-green-100 mb-1">Students</div>
                                <div className="text-xs text-green-100 mb-1">Per Cohort</div>
                                <div className="text-xl font-bold">20-30</div>
                            </div>

                            {/* SUI Blockchain card */}
                            <div className="absolute top-32 left-40 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <div className="text-center text-white">
                                    <div className="text-lg font-bold">SUI</div>
                                    <div className="text-xs">Blockchain</div>
                                </div>
                            </div>

                            {/* Red circle */}
                            <div className="absolute bottom-16 right-16 w-12 h-12 bg-red-500 rounded-full shadow-lg"></div>

                            {/* Triangle */}
                            <div className="absolute bottom-8 right-8 w-0 h-0 border-l-4 border-r-4 border-b-[6px] border-l-transparent border-r-transparent border-b-gray-800"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MentorshipPage;
