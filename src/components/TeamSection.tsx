
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { MotionDiv } from '@/components/ui/MotionDiv';
import { teamMembers } from '@/data/team';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { staggeredChildren } from '@/lib/animation';

const TeamSection = () => {
  const getDelay = staggeredChildren(0.1, 0.2);
  
  return (
    <section id="team" className="py-20">
      <div className="container px-4 mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dedicated team is passionate about bringing blockchain education to campuses.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <MotionDiv
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: getDelay(index) }}
            >
              <Card className="overflow-hidden text-center group">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{member.role}</p>
                  
                  <div className="flex justify-center space-x-3">
                    {member.social.twitter && (
                      <Link 
                        to={member.social.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-blue-400 transition-colors"
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    
                    {member.social.linkedin && (
                      <Link 
                        to={member.social.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-blue-600 transition-colors"
                      >
                        <Linkedin size={18} />
                      </Link>
                    )}
                    
                    {member.social.github && (
                      <Link 
                        to={member.social.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-gray-800 dark:hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
