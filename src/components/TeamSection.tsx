
import React from 'react';
import { teamMembers } from '@/data/team';
import MotionDiv from './ui/MotionDiv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ArrowUpIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

const TeamSection = () => {
  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-sui-navy-light/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <MotionDiv
            animation="fade-in"
            delay={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
              Meet the passionate individuals dedicated to growing the Sui ecosystem and supporting the next generation of blockchain developers.
            </p>
          </MotionDiv>
        </div>

        <MotionDiv
          animation="fade-in"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <MotionDiv
              key={member.name}
              animation="fade-in"
              delay={index * 0.1}
              className="group"
            >
              <div className="bg-white dark:bg-sui-navy-light/30 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 hover-lift transition-all">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sui-blue dark:text-sui-blue font-medium mb-3">{member.role}</p>
                  <p className="text-foreground/70 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    {Object.entries(member.socials).map(([platform, url]) => (
                      url && (
                        <a
                          key={platform}
                          href={url}
                          className="text-foreground/60 hover:text-sui-blue dark:hover:text-sui-blue-light transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">{platform}</span>
                          {platform === 'x' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6l-12 12" />
                              <path d="M17 20h-7.5A3.5 3.5 0 0 1 6 16.5v0A3.5 3.5 0 0 1 9.5 13H15" />
                              <path d="M9 8h7.5A3.5 3.5 0 0 1 20 11.5v0a3.5 3.5 0 0 1-3.5 3.5H10" />
                            </svg>
                          ) : platform === 'github' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                          ) : platform === 'linkedin' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect width="4" height="12" x="2" y="9" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          ) : (
                            <span>{platform}</span>
                          )}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

export default TeamSection;
