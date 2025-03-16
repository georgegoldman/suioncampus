
import { LinkedinIcon, Twitter, GithubIcon } from 'lucide-react';
import MotionDiv from './ui/MotionDiv';
import { staggeredChildren } from '@/lib/animation';
import { teamMembers } from '@/data/team';

const TeamSection = () => {
  const getDelay = staggeredChildren(0.2, 0.2);
  
  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionDiv animation="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-foreground/70 text-lg">
              Meet the passionate individuals behind Sui On Campus, dedicated to bringing blockchain education to universities worldwide.
            </p>
          </MotionDiv>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <MotionDiv 
              key={member.name} 
              animation="fade-in" 
              delay={getDelay(i)}
              className="group"
            >
              <div className="relative bg-white dark:bg-sui-navy-light/30 rounded-xl overflow-hidden hover-lift h-full flex flex-col border border-gray-100 dark:border-white/5">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-center gap-4">
                        {member.socials.x && (
                          <a href={member.socials.x} className="text-white hover:text-sui-blue transition-colors">
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {member.socials.linkedin && (
                          <a href={member.socials.linkedin} className="text-white hover:text-sui-blue transition-colors">
                            <LinkedinIcon className="h-5 w-5" />
                          </a>
                        )}
                        {member.socials.github && (
                          <a href={member.socials.github} className="text-white hover:text-sui-blue transition-colors">
                            <GithubIcon className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-6 flex-grow">
                  <h3 className="text-xl font-medium">{member.name}</h3>
                  <p className="text-sui-blue text-sm mb-3">{member.role}</p>
                  <p className="text-foreground/70 text-sm flex-grow">{member.bio}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
        
        <MotionDiv animation="fade-in" delay={0.8} className="mt-16 text-center">
          <div className="inline-block glass p-4 rounded-full">
            <p className="text-foreground/80 text-balance">
              <span className="font-medium">Want to join our team?</span> We're always looking for passionate individuals to help us grow.
            </p>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default TeamSection;
