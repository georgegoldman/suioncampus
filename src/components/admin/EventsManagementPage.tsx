
import { useState } from 'react';
import { PlusCircle, Filter } from 'lucide-react';
import { Event, events as initialEvents } from '@/data/events';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import EventForm from './EventForm';
import EventsTable from './EventsTable';

const EventsManagementPage = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'hackathon' | 'workshop' | 'meetup'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'past' | 'upcoming'>('all');
  const { toast } = useToast();
  
  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    
    // Date filter
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'past' && event.isPast) || 
                       (dateFilter === 'upcoming' && !event.isPast);
    
    return matchesSearch && matchesType && matchesDate;
  });
  
  const handleCreateSuccess = () => {
    setShowEventForm(false);
    // In a real app, you would fetch the updated events from the server
    // For now we'll just simulate adding a new event
    if (editingEvent) {
      // This is just a placeholder as we don't actually update the event
      setEditingEvent(undefined);
    }
  };
  
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };
  
  const handleDeleteEvent = (eventId: string) => {
    // In a real app, you would call an API to delete the event
    setEvents(events.filter(event => event.id !== eventId));
  };
  
  const handleAddNew = () => {
    setEditingEvent(undefined);
    setShowEventForm(true);
  };
  
  const handleTogglePin = (eventId: string, isPinned: boolean) => {
    // In a real app, you would call an API to update the event
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isPinned } 
        : event
    ));
    
    toast({
      title: isPinned ? 'Event pinned' : 'Event unpinned',
      description: `The event has been ${isPinned ? 'pinned to' : 'removed from'} the homepage.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">
            Create and manage events, workshops, and hackathons
          </p>
        </div>
        
        <Button 
          className="bg-sui-blue hover:bg-sui-blue-dark"
          onClick={handleAddNew}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Event
        </Button>
      </div>
      
      <Tabs defaultValue={showEventForm ? "create" : "manage"} value={showEventForm ? "create" : "manage"}>
        <TabsList>
          <TabsTrigger 
            value="manage"
            onClick={() => setShowEventForm(false)}
          >
            Manage Events
          </TabsTrigger>
          <TabsTrigger 
            value="create"
            onClick={() => setShowEventForm(true)}
          >
            {editingEvent ? 'Edit Event' : 'Create Event'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manage" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Event Type</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setTypeFilter('all')}>
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('hackathon')}>
                    Hackathons
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('workshop')}>
                    Workshops
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('meetup')}>
                    Meetups
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel>Date</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setDateFilter('all')}>
                    All Events
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('upcoming')}>
                    Upcoming
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter('past')}>
                    Past Events
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <EventsTable 
            events={filteredEvents} 
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            onTogglePin={handleTogglePin}
            onViewParticipants={(eventId) => {
              console.log(`View participants for event: ${eventId}`);
              // This would navigate to a participants view in a real app
            }}
          />
        </TabsContent>
        
        <TabsContent value="create">
          <EventForm 
            event={editingEvent} 
            onSuccess={handleCreateSuccess} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsManagementPage;
