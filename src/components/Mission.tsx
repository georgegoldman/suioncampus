
import React from 'react';
import MotionDiv from './ui/MotionDiv';

const Mission = () => {
  return (
    <section id="mission" className="py-20  relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <MotionDiv
            animation="fade-in"
            delay={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-foreground/70">
              We're dedicated to educating the next generation of blockchain developers and expanding the Sui ecosystem.
            </p>
          </MotionDiv>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <MotionDiv
            animation="fade-in"
            delay={0.1}
            className=" p-8 rounded-xl shadow-sm hover-lift border border-gray-100 dark:border-white/5"
          >
            <div className="w-14 h-14 mb-6 rounded-full bg-sui-blue/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-sui-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Education</h3>
            <p className="text-foreground/70">
              Providing comprehensive resources and workshops to help developers master Sui blockchain technologies.
            </p>
          </MotionDiv>

          <MotionDiv
            animation="fade-in"
            delay={0.2}
            className=" p-8 rounded-xl shadow-sm hover-lift border border-gray-100 "
          >
            <div className="w-14 h-14 mb-6 rounded-full bg-sui-purple/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-sui-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-foreground/70">
              Fostering creativity and supporting projects that push the boundaries of what's possible on Sui.
            </p>
          </MotionDiv>

          <MotionDiv
            animation="fade-in"
            delay={0.3}
            className=" p-8 rounded-xl shadow-sm hover-lift border border-gray-100 dark:border-white/5"
          >
            <div className="w-14 h-14 mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-foreground/70">
              Building a vibrant, inclusive, and collaborative ecosystem of developers, mentors, and enthusiasts.
            </p>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Mission;
