
import { LightbulbIcon, GlobeIcon, UsersIcon } from 'lucide-react';
import MotionDiv from './ui/MotionDiv';
import { staggeredChildren } from '@/lib/animation';

const missionItems = [
  {
    title: 'Education',
    description: 'Providing accessible blockchain education and resources to university students worldwide.',
    icon: LightbulbIcon,
    color: 'bg-sui-blue'
  },
  {
    title: 'Community',
    description: 'Building a global network of campus leaders and blockchain enthusiasts.',
    icon: UsersIcon,
    color: 'bg-sui-purple'
  },
  {
    title: 'Innovation',
    description: 'Fostering the development of groundbreaking projects through hackathons and workshops.',
    icon: GlobeIcon,
    color: 'bg-green-500'
  }
];

const Mission = () => {
  const getDelay = staggeredChildren(0.2, 0.2);
  
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-sui-navy-light/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionDiv animation="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-foreground/70 text-lg">
              Sui On Campus is dedicated to advancing blockchain education and adoption across universities worldwide through events, resources, and a supportive community.
            </p>
          </MotionDiv>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionItems.map((item, i) => (
            <MotionDiv 
              key={item.title} 
              animation="slide-in" 
              delay={getDelay(i)}
              className="hover-lift"
            >
              <div className="bg-white dark:bg-sui-navy-light/30 rounded-xl p-8 h-full border border-gray-100 dark:border-white/5">
                <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                  <item.icon className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
        
        <MotionDiv animation="fade-in" delay={0.6} className="mt-16">
          <div className="bg-gradient-to-br from-sui-blue to-sui-purple p-[1px] rounded-2xl">
            <div className="bg-white dark:bg-sui-navy-light/90 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h3>
                  <p className="text-foreground/70 mb-6">
                    We envision a future where blockchain technology is accessible to all students, empowering them to build innovative solutions and shape the future of decentralized systems.
                  </p>
                  <ul className="space-y-3">
                    {['Global reach', 'Educational excellence', 'Community-first approach'].map((item) => (
                      <li key={item} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-sui-blue/10 flex items-center justify-center mr-3 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-sui-blue"></div>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-sui-blue/20 to-sui-purple/20 rounded-xl blur-xl"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block mb-4">
                        <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto">
                          <div className="w-12 h-12 rounded-full bg-sui-blue animate-pulse-slow flex items-center justify-center text-white font-bold">
                            Sui
                          </div>
                        </div>
                      </div>
                      <h4 className="text-xl font-medium">Powered by Sui</h4>
                      <p className="text-foreground/70 max-w-xs mx-auto mt-2">
                        Leveraging Sui's scalable infrastructure to educate the next generation of builders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Mission;
