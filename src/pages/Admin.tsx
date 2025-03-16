
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, UploadCloud } from 'lucide-react';
import { format } from 'date-fns';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
import { toast } from '@/hooks/use-toast';

// Define form schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  date: z.date({ required_error: 'Please select a date' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  type: z.enum(['hackathon', 'workshop', 'meetup']),
  imageUrl: z.string().url({ message: 'Please enter a valid URL' }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Admin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: 'hackathon',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Mock API call - In a real app, you would send this to your backend
      console.log('Event data to save:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Event created!',
        description: 'Your event has been successfully created.',
      });
      
      // Reset form
      form.reset();
      
      // Navigate to events page (optional)
      // navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: 'Error',
        description: 'Failed to create event. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-24">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-gradient">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Create and manage events and hackathons for Sui On Campus.
            </p>
            
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h2 className="text-2xl font-semibold mb-6">Create New Event</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
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
                                // In a real app, you would integrate file upload here
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
                  
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto bg-sui-blue hover:bg-sui-blue-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Event'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
