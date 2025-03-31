
import { useState } from 'react';
import { Calendar, MapPin, Edit, Trash2, Eye, Pin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Event } from '@/data/events';

interface EventsTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  onViewParticipants?: (eventId: string) => void;
  onTogglePin?: (eventId: string, isPinned: boolean) => void;
}

const EventsTable = ({ events, onEdit, onDelete, onViewParticipants, onTogglePin }: EventsTableProps) => {
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleDelete = () => {
    if (eventToDelete) {
      onDelete(eventToDelete);
      setEventToDelete(null);
      toast({
        title: 'Event deleted',
        description: 'The event has been successfully deleted.',
      });
    }
  };
  
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>List of all events</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="flex items-center">
                        {event.isPinned && <Pin className="h-3.5 w-3.5 mr-1.5 text-sui-blue" />}
                        {event.title}
                      </span>
                      <span className="text-xs text-muted-foreground md:hidden">
                        {event.type} · {event.date}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.type === 'hackathon' ? 'bg-sui-blue/10 text-sui-blue' :
                      event.type === 'workshop' ? 'bg-green-500/10 text-green-600' :
                      'bg-sui-purple/10 text-sui-purple'
                    }`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      {event.date}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {onTogglePin && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`h-8 ${event.isPinned ? 'bg-sui-blue/10 text-sui-blue' : ''}`}
                          onClick={() => onTogglePin(event.id, !event.isPinned)}
                        >
                          <Pin className="h-3.5 w-3.5" />
                          <span className="sr-only md:not-sr-only md:ml-2">
                            {event.isPinned ? 'Unpin' : 'Pin'}
                          </span>
                        </Button>
                      )}
                      {onViewParticipants && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8"
                          onClick={() => onViewParticipants(event.id)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="sr-only md:not-sr-only md:ml-2">Participants</span>
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => onEdit(event)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-red-500 hover:text-red-600"
                            onClick={() => setEventToDelete(event.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the event "{event.title}". 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setEventToDelete(null)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No events found. Create your first event to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventsTable;
