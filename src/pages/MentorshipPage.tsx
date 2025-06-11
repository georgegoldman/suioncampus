import BrickLayoutSection from "@/components/BrickLayoutSection";
import Header from "@/components/Header";
import MentorshipDetail from "@/components/MentorshipDetail";
import React from "react";

const MentorshipPage: React.FC = () => {

    
    return (
        <>
            <Header />
            <div className="container mx-auto px-2 py-5 sm:py-10 lg:px-20 lg:py-20">
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
                    <div className="flex-1 py-2">
                        <BrickLayoutSection />
                    </div>
                </div>
            {/* MentorshipDetail component moved outside the flex container */}
            <MentorshipDetail />
            </div>
            
        </>
    );
};

export default MentorshipPage;