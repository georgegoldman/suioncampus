
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, UploadCloud } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { EventItem } from '@/data/events';

// Define form schema
const formSchema = z.object({
  name: z.string().min(3, { message: 'name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  date: z.date({ required_error: 'Please select a date' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  type: z.enum(['hackathon', 'workshop', 'meetup']),
  imageUrl: z.string().url({ message: 'Please enter a valid URL' }).optional(),
  registrationLink: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  event?: EventItem; // Optional for editing
  onSuccess: () => void;
}

const EventForm = ({ event, onSuccess }: EventFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize the form with existing event data if editing
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: event ? {
      name: event.name,
      description: event.description,
      date: event.date ? new Date(event.date) : undefined,
      location: event.location,
      type: event.type,
      imageUrl: event.image,
      registrationLink: event.registrationLink || '',
    } : {
      name: '',
      description: '',
      location: '',
      type: 'hackathon',
      imageUrl: '',
      registrationLink: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      console.log('Event data to save:', data);
      
      // Format the date properly
      const formattedData = {
        ...data,
        date: format(data.date, 'MMMM d, yyyy'),
        image: data.imageUrl,
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        name: event ? 'Event updated!' : 'Event created!',
        description: event 
          ? 'Your event has been successfully updated.' 
          : 'Your event has been successfully created.',
      });
      
      // Reset form if creating new event
      if (!event) {
        form.reset();
      }
      
      // Call success callback
      onSuccess();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: 'Error',
        description: `Failed to ${event ? 'update' : 'create'} event. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md border border-border">
      <h2 className="text-2xl font-semibold mb-6">{event ? 'Edit Event' : 'Create New Event'}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter event description" 
                    className="min-h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="meetup">Meetup</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Image URL</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      {...field} 
                      value={field.value || ''}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      onClick={() => {
                        toast({
                          title: 'Upload functionality',
                          description: 'Image upload would be integrated with Supabase storage.',
                        });
                      }}
                    >
                      <UploadCloud className="h-5 w-5" />
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Enter a URL for the event banner image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="registrationLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Link (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/register" 
                    {...field} 
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>
                  Leave empty if registration is not open yet
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full sm:w-auto bg-sui-blue hover:bg-sui-blue-dark"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (event ? 'Updating...' : 'Creating...') 
              : (event ? 'Update Event' : 'Create Event')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;