
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MotionDiv from './ui/MotionDiv';
import { scrollToElement } from '@/lib/animation';
import { events } from '@/data/events';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const pinnedEvent = events.find(event => event.isPinned);
  
  return (
    <section className="min-h-screen flex items-center pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <MotionDiv animation="fade-in" delay={0.2}>
              <div className="inline-block px-3 py-1 rounded-full glass text-xs font-medium mb-4">
                <span className="text-sui-blue inline-flex items-center">
                  <span className="h-2 w-2 rounded-full bg-sui-blue mr-2 animate-pulse-slow"></span>
                  The future of blockchain education
                </span>
              </div>
            </MotionDiv>
            
            <MotionDiv animation="fade-in" delay={0.4}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance">
                <span className="text-gradient">Sui On Campus</span> <br />
                Empowering the next generation
              </h1>
            </MotionDiv>
            
            <MotionDiv animation="fade-in" delay={0.6}>
              <p className="text-lg text-foreground/80 max-w-md text-balance">
                A community-driven initiative bringing blockchain education, events, and hackathons to university campuses worldwide.
              </p>
            </MotionDiv>
            
            <MotionDiv animation="fade-in" delay={0.8}>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  onClick={() => scrollToElement('events')}
                  className="bg-sui-blue hover:bg-sui-blue-dark text-white font-medium rounded-full px-8 py-6 transition-all hover:shadow-lg hover:shadow-sui-blue/20"
                >
                  Explore Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  onClick={() => scrollToElement('about')}
                  variant="outline"
                  className="rounded-full px-8 py-6 border-foreground/20 hover:bg-foreground/5"
                >
                  Learn More
                </Button>
              </div>
            </MotionDiv>
            
            <MotionDiv animation="fade-in" delay={1}>
              <div className="pt-8 mt-8 border-t border-foreground/10">
                <p className="text-sm text-foreground/60 mb-3">Trusted by universities Nationwide</p>
                <div className="flex flex-wrap gap-6 items-center">
                  {['UNN', 'UNIPORT', 'UNIUYO', 'UNIBEN', 'FUTMINNA'].map((uni, i) => (
                    <div key={uni} className="text-foreground/40 text-sm font-mono">
                      {uni}
                    </div>
                  ))}
                </div>
              </div>
            </MotionDiv>
          </div>
          
          <MotionDiv animation="fade-in" delay={0.6} className="relative">
            <div className="relative w-full aspect-square md:aspect-auto md:h-[600px]">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-sui-blue/20 to-sui-purple/20 rounded-3xl blur-3xl opacity-60"></div>
              <div className="absolute inset-10 glass rounded-3xl overflow-hidden hover-lift">
                <div className="absolute inset-0 bg-sui-navy-dark/30"></div>
                {pinnedEvent ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center px-6">
                      <div className="w-20 h-20 rounded-full glass mx-auto flex items-center justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-sui-blue animate-pulse-slow"></div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-medium mb-2">{pinnedEvent.title}</h3>
                      <p className="text-white/70 mb-2">{pinnedEvent.date} • {pinnedEvent.location}</p>
                      <p className="text-white/70 mb-6">{pinnedEvent.description}</p>
                      <Button 
                        className="bg-white text-sui-navy hover:bg-white/90 rounded-full"
                        onClick={() => navigate(`/events/${pinnedEvent.id}`)}
                      >
                        Register Now
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center px-6">
                      <div className="w-20 h-20 rounded-full glass mx-auto flex items-center justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-sui-blue animate-pulse-slow"></div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-medium mb-4">Hackathon Starting Soon</h3>
                      <p className="text-white/70 mb-6">Join our next global hackathon and build the future of Web3</p>
                      <Button 
                        className="bg-white text-sui-navy hover:bg-white/90 rounded-full"
                        onClick={() => scrollToElement('events')}
                      >
                        Register Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 w-40 h-40 bg-sui-purple/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-sui-blue/30 rounded-full blur-3xl"></div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Hero;
