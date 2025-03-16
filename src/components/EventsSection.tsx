
import { useState } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MotionDiv from './ui/MotionDiv';
import { staggeredChildren } from '@/lib/animation';
import { events } from '@/data/events';

const EventsSection = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'hackathon' | 'workshop' | 'meetup'>('all');
  
  const getDelay = staggeredChildren(0.2, 0.2);
  
  const filteredEvents = events.filter(event => {
    if (filter === 'upcoming' && event.isPast) return false;
    if (filter === 'past' && !event.isPast) return false;
    if (typeFilter !== 'all' && event.type !== typeFilter) return false;
    return true;
  });
  
  const handleFilterChange = (newFilter: 'all' | 'upcoming' | 'past') => {
    setFilter(newFilter);
  };
  
  const handleTypeFilterChange = (newFilter: 'all' | 'hackathon' | 'workshop' | 'meetup') => {
    setTypeFilter(newFilter);
  };
  
  return (
    <section id="events" className="py-20 bg-gray-50 dark:bg-sui-navy-light/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <MotionDiv animation="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Events & Hackathons</h2>
            <p className="text-foreground/70 text-lg text-center mb-8">
              Discover our upcoming events and past hackathons, designed to educate and inspire the next generation of blockchain builders.
            </p>
          </MotionDiv>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              className={filter === 'all' ? 'bg-sui-blue hover:bg-sui-blue-dark' : ''}
              onClick={() => handleFilterChange('all')}
            >
              All Events
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'default' : 'outline'}
              className={filter === 'upcoming' ? 'bg-sui-blue hover:bg-sui-blue-dark' : ''}
              onClick={() => handleFilterChange('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'past' ? 'default' : 'outline'}
              className={filter === 'past' ? 'bg-sui-blue hover:bg-sui-blue-dark' : ''}
              onClick={() => handleFilterChange('past')}
            >
              Past Events
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={typeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              className={typeFilter === 'all' ? 'bg-sui-purple hover:bg-sui-purple-dark' : ''}
              onClick={() => handleTypeFilterChange('all')}
            >
              All Types
            </Button>
            <Button
              variant={typeFilter === 'hackathon' ? 'default' : 'outline'}
              size="sm"
              className={typeFilter === 'hackathon' ? 'bg-sui-purple hover:bg-sui-purple-dark' : ''}
              onClick={() => handleTypeFilterChange('hackathon')}
            >
              Hackathons
            </Button>
            <Button
              variant={typeFilter === 'workshop' ? 'default' : 'outline'}
              size="sm"
              className={typeFilter === 'workshop' ? 'bg-sui-purple hover:bg-sui-purple-dark' : ''}
              onClick={() => handleTypeFilterChange('workshop')}
            >
              Workshops
            </Button>
            <Button
              variant={typeFilter === 'meetup' ? 'default' : 'outline'}
              size="sm"
              className={typeFilter === 'meetup' ? 'bg-sui-purple hover:bg-sui-purple-dark' : ''}
              onClick={() => handleTypeFilterChange('meetup')}
            >
              Meetups
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => (
              <MotionDiv 
                key={event.id} 
                animation="fade-in" 
                delay={getDelay(i)}
                className="group"
              >
                <div className="bg-white dark:bg-sui-navy-light/30 rounded-xl overflow-hidden hover-lift h-full flex flex-col border border-gray-100 dark:border-white/5">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.type === 'hackathon' ? 'bg-sui-blue text-white' :
                        event.type === 'workshop' ? 'bg-green-500 text-white' :
                        'bg-sui-purple text-white'
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    {event.isPast && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-foreground/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Past Event
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4 flex-grow">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-foreground/70">
                        <Calendar className="h-4 w-4 mr-2 text-sui-blue" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-foreground/70">
                        <MapPin className="h-4 w-4 mr-2 text-sui-blue" />
                        {event.location}
                      </div>
                    </div>
                    {event.registrationLink && !event.isPast && (
                      <Button
                        className="w-full bg-sui-blue hover:bg-sui-blue-dark text-white"
                      >
                        Register Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {!event.registrationLink && (
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </MotionDiv>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-foreground/70">No events found matching your filters.</p>
            </div>
          )}
        </div>
        
        <MotionDiv animation="fade-in" delay={0.8} className="mt-16 text-center">
          <Button
            className="bg-sui-blue hover:bg-sui-blue-dark text-white font-medium rounded-full px-8 py-6 transition-all hover:shadow-lg hover:shadow-sui-blue/20"
          >
            View All Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
};

export default EventsSection;
