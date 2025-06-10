import Header from "@/components/Header";
import MentorshipDetail from "@/components/MentorshipDetail";
import React from "react";

const MentorshipPage: React.FC = () => {

    
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8 sm:py-10 lg:px-20 lg:py-20">
                <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
                    {/* Left section - Text content */}
                    <div className="flex-1 flex items-center px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-6 sm:py-8 lg:py-12">
                        <div className="w-full max-w-3xl">
                            <p className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                                A Mentorship Framework for Learners
                            </p>
                            
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-textPrimary leading-tight mb-4 sm:mb-6">
                                Connect &<br />
                                learn from<br />
                                the experts
                            </h1>
                            
                            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                Grow your career fast with the right mentor.
                            </p>
                            
                            
                        </div>
                    </div>

                    {/* Right section - Visual layout */}
                    <div className="flex-1 flex items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
                        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] mx-auto">
                            {/* Yellow Circle */}
                            <div className="absolute top-0 left-4 sm:left-6 lg:left-8 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                <div className="text-center">
                                    <div className="text-sm sm:text-base lg:text-lg font-bold">6</div>
                                    <div className="text-xs font-bold">Weeks</div>
                                    <div className="text-xs">Program</div>
                                </div>
                            </div>

                            {/* Small white circle */}
                            <div className="absolute top-1 sm:top-2 left-20 sm:left-24 lg:left-32 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full border-2 border-gray-300"></div>

                            {/* Active Professionals card */}
                            <div className="absolute top-4 sm:top-6 lg:top-8 right-6 sm:right-8 lg:right-12 bg-black text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg min-w-max">
                                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-xs text-gray-300">Active</span>
                                </div>
                                <div className="text-xs text-gray-300 mb-1">Mentors</div>
                                <div className="text-lg sm:text-xl font-bold">50+</div>
                            </div>

                            {/* Purple circle */}
                            <div className="absolute top-2 sm:top-3 lg:top-4 right-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
                                <div className="text-center">
                                    <div className="text-xs sm:text-sm font-bold">Business</div>
                                    <div className="text-xs">Track</div>
                                </div>
                            </div>

                            {/* Blue rectangle */}
                            <div className="absolute top-12 sm:top-16 lg:top-20 left-0 w-24 h-28 sm:w-28 sm:h-32 lg:w-32 lg:h-40 bg-blue-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg">
                                <div className="text-center text-white px-2">
                                    <div className="text-xs sm:text-sm font-bold mb-1">Engineering</div>
                                    <div className="text-xs mb-1 sm:mb-2">Track</div>
                                    <div className="text-xs">Move Development</div>
                                    <div className="text-xs">dApp Building</div>
                                </div>
                            </div>

                            {/* Star */}
                            <div className="absolute top-20 sm:top-24 lg:top-32 left-28 sm:left-32 lg:left-40 transform -translate-x-1/2 -translate-y-1/2">
                                <svg width="16" height="16" className="sm:w-20 sm:h-20 lg:w-24 lg:h-24" viewBox="0 0 24 24" className="text-gray-800">
                                    <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" fill="currentColor" />
                                </svg>
                            </div>

                            {/* Yellow quarter circle */}
                            <div className="absolute top-28 sm:top-32 lg:top-40 right-4 sm:right-6 lg:right-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-yellow-400 rounded-tl-full shadow-lg"></div>

                            {/* Green card */}
                            <div className="absolute bottom-8 sm:bottom-10 lg:bottom-12 left-2 sm:left-3 lg:left-4 bg-green-400 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg min-w-max">
                                <div className="text-xs text-green-100 mb-1">Students</div>
                                <div className="text-xs text-green-100 mb-1">Per Cohort</div>
                                <div className="text-lg sm:text-xl font-bold">20-30</div>
                            </div>

                            {/* SUI Blockchain card */}
                            <div className="absolute top-20 sm:top-24 lg:top-32 left-28 sm:left-32 lg:left-40 w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                                <div className="text-center text-white">
                                    <div className="text-sm sm:text-base lg:text-lg font-bold">SUI</div>
                                    <div className="text-xs">Blockchain</div>
                                </div>
                            </div>

                            {/* Red circle */}
                            <div className="absolute bottom-10 sm:bottom-12 lg:bottom-16 right-10 sm:right-12 lg:right-16 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-500 rounded-full shadow-lg"></div>

                            {/* Triangle */}
                            <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 w-0 h-0 border-l-2 border-r-2 border-b-4 sm:border-l-4 sm:border-r-4 sm:border-b-6 border-l-transparent border-r-transparent border-b-gray-800"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* MentorshipDetail component moved outside the flex container */}
            <MentorshipDetail />
        </>
    );
};

export default MentorshipPage;