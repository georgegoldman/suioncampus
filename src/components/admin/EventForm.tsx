import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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
import ImageUploader from '@/components/ImageUploader';
import api from '@/api';
import CloudinaryImage from '@/components/ImageUploader';

// Define form schema
const formSchema = z.object({
  name: z.string().min(3, { message: 'name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  start_time: z.date({ required_error: 'Please select a date' }),
  end_time: z.date({ required_error: 'Please select a date' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  event_type: z.enum(['hackathon', 'workshop', 'meetup']),
  image_url: z.string().optional(),
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
  const [imageUrl, setImageUrl] = useState<string>(event?.image || '');
  
  // Initialize the form with existing event data if editing
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: event ? {
      name: event.name,
      description: event.description,
      start_time: event.start_time ? new Date(event.start_time) : undefined,
      end_time: event.end_time ? new Date(event.end_time) : undefined,
      location: event.location,
      event_type: event.type as 'hackathon' | 'workshop' | 'meetup',
      image_url: event.image || '',
      registrationLink: event.registrationLink || '',
    } : {
      name: '',
      description: '',
      location: '',
      event_type: 'hackathon',
      image_url: '',
      registrationLink: '',
    },
  });

  // Handle image change from the ImageUploader component
  const handleImageChange = (url: string) => {
    setImageUrl(url);
    form.setValue('image_url', url);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
  
    try {
      const formattedData = {
        ...data,
        start_time: new Date(data.start_time).toISOString(),
        end_time: new Date(data.end_time).toISOString(),
        image_url: imageUrl, // Use the uploaded image URL
        updated_at: new Date().toISOString()
      };
  
      let response;
  
      if (event) {
        // Update existing event
        response = await api.put(`/event/${event.id}`, formattedData);
      } else {
        // Create new event
        response = await api.post('/event', formattedData);
      }
  
      toast({
        title: event ? 'Event updated!' : 'Event created!',
        description: event
          ? 'Your event has been successfully updated.'
          : 'Your event has been successfully created.',
      });
  
      if (!event) {
        form.reset();
        setImageUrl('');
      }
  
      onSuccess(); // callback on successful creation/update
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

  useEffect(() => {
    console.log('Form errors updated:', form.formState.errors);
  }, [form.formState.errors]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-md border border-border">
      <h2 className="text-2xl font-semibold mb-6">{event ? 'Edit Event' : 'Create New Event'}</h2>
      
      {/* Image Uploader Component */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Event Image</label>
        <ImageUploader onUploadSuccess={handleImageChange} />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(
          (data) => {
            console.log('onSubmit triggered');
            console.log('Form data:', data);
            onSubmit(data);
          },
          (errors) => {
            console.log('Submission errors:', errors);
          }
        )} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event name" {...field} />
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
          
          <div className="flex gap-x-4">
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
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
              name="end_time"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>End Date</FormLabel>
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
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                <Textarea 
                  placeholder="Enter Location" 
                  className="min-h-10"
                  {...field} 
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="event_type"
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