
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ExternalLink, Filter } from 'lucide-react';
import { fetchEvents, EventItem } from '@/data/events';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventRegistrationModal from './EventRegistrationModal';

// Correct the type issue with the size property
const EventCard = ({ event }: { event: EventItem }) => {
  const navigate = useNavigate();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  
  // Define date badge color based on event type
  const getBadgeColor = (type: EventItem['type']) => {
    switch (type) {
      case 'hackerthon':
        return 'bg-blue-500/10 text-blue-500';
      case 'workshop':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'meetup':
        return 'bg-amber-500/10 text-amber-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="bg-card border rounded-xl overflow-hidden hover-lift transition-all group">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(event.type)}`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
        {event.isPinned && (
          <div className="absolute top-0 right-0 bg-sui-blue text-white text-xs px-2 py-1 m-2 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" /> {event.date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" /> {event.location}
          </div>
          {!event.isPast && (
            <div className="flex items-center text-sm text-emerald-500">
              <Users className="h-4 w-4 mr-2" /> Registration Open
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant={event.isPast ? "outline" : "default"} 
            className={event.isPast ? "" : "bg-sui-blue hover:bg-sui-blue-dark"}
            onClick={() => event.isPast ? navigate(`/events/${event.id}`) : setShowRegistrationModal(true)}
          >
            {event.isPast ? 'View Details' : 'Register Now'}
          </Button>
          
          {event.isPast && (
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <EventRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        event={event}
      />
    </div>
  );
};

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState(events);


  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents); // This should properly set the events state
        console.log("hello");
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    
    getEvents();
  }, []);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredEvents(events.filter(event => !event.isPast));
    } else if (activeTab === 'hackerthon') {
      setFilteredEvents(events.filter(event => event.type === "hackerthon" && !event.isPast));
    } else if (activeTab === 'workshop') {
      setFilteredEvents(events.filter(event => event.type === "workshop" && !event.isPast));
    } else if (activeTab === 'meetup') {
      setFilteredEvents(events.filter(event => event.type === "meetup" && !event.isPast));
    }else {
      setFilteredEvents(events.filter(event => event.type === activeTab && !event.isPast));
    }
  }, [activeTab, events]);

  return (
    <section id="events" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-md">
              Join us at our upcoming events, workshops, and hackathons at universities across the country.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {}}
            className="flex items-center gap-2 self-start md:self-auto"
          >
            <Filter className="h-4 w-4" />
            Filter Events
          </Button>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-8 w-full max-w-md mx-auto grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hackerthon">Hackerthons</TabsTrigger>
            <TabsTrigger value="workshop">Workshops</TabsTrigger>
            <TabsTrigger value="meetup">Meetups</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No events found for this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default EventsSection;
