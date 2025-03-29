
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MotionDiv } from '@/components/ui/MotionDiv';
import { Calendar, MapPin, Users } from 'lucide-react';
import { events } from '@/data/events';
import { scrollToElement, staggeredChildren } from '@/lib/animation';
import EventRegistrationForm from './EventRegistrationForm';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const getDelay = staggeredChildren(0.1, 0.2);

  const handleRegister = (eventId) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to register for events",
        variant: "destructive",
      });
      return;
    }
    setSelectedEvent(events.find(event => event.id === eventId));
    setRegistrationOpen(true);
  };

  const handleRegistrationSubmit = (formData) => {
    console.log('Registration data:', formData);
    
    toast({
      title: "Registration successful!",
      description: `You've registered for ${selectedEvent?.title}`,
    });
    
    setRegistrationOpen(false);
  };

  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us at these upcoming Sui on Campus events to learn, network, and engage with the community.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <MotionDiv
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: getDelay(index) }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="object-cover w-full h-full"
                  />
                  {event.featured && (
                    <div className="absolute top-2 right-2 bg-primary px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{event.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-sui-blue hover:bg-sui-blue-dark"
                    onClick={() => handleRegister(event.id)}
                  >
                    Register Now
                  </Button>
                </div>
              </Card>
            </MotionDiv>
          ))}
        </div>

        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToElement('events')}
          >
            View All Events
          </Button>
        </MotionDiv>
      </div>

      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Complete the form below to register for this event.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <EventRegistrationForm 
              event={selectedEvent} 
              onSubmit={handleRegistrationSubmit} 
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventsSection;
