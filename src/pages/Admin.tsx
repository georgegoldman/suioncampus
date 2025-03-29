
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, UploadCloud, Users, FileText } from 'lucide-react';
import { format } from 'date-fns';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { teamMembers } from '@/data/team';
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
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Define form schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  date: z.date({ required_error: 'Please select a date' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  type: z.enum(['hackathon', 'workshop', 'meetup']),
  imageUrl: z.string().url({ message: 'Please enter a valid URL' }).optional(),
});

// Define team member form schema 
const teamMemberSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters' }),
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters' }),
  image: z.string().url({ message: 'Please enter a valid URL' }),
  linkedin: z.string().url({ message: 'Please enter a valid LinkedIn URL' }).optional().or(z.literal('')),
  github: z.string().url({ message: 'Please enter a valid GitHub URL' }).optional().or(z.literal('')),
  x: z.string().url({ message: 'Please enter a valid X (Twitter) URL' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;
type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTeamSubmitting, setIsTeamSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("events");
  const [teamMembers, setTeamMembers] = useState([]);
  
  // Initialize the event form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: 'hackathon',
    },
  });

  // Initialize the team member form
  const teamForm = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: '',
      role: '',
      bio: '',
      image: '',
      linkedin: '',
      github: '',
      x: '',
    },
  });

  // Redirect if not admin
  if (user && !user.isAdmin) {
    navigate('/');
    return null;
  }

  // If not logged in
  if (!user) {
    navigate('/sign-in');
    return null;
  }

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

  const onTeamSubmit = async (data: TeamMemberFormValues) => {
    setIsTeamSubmitting(true);
    
    try {
      // Mock API call for adding team member
      console.log('Team member data to save:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Team member added!',
        description: 'The team member has been successfully added.',
      });
      
      // Reset form
      teamForm.reset();
    } catch (error) {
      console.error('Error adding team member:', error);
      toast({
        title: 'Error',
        description: 'Failed to add team member. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsTeamSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-gradient">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Manage events, team members, and other content for Sui On Campus.
            </p>
            
            <Tabs defaultValue="events" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Events</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="events" className="space-y-8">
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
              </TabsContent>
              
              <TabsContent value="team" className="space-y-8">
                <div className="bg-card rounded-lg p-6 shadow-md border border-border">
                  <h2 className="text-2xl font-semibold mb-6">Team Members</h2>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableCaption>List of team members</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="hidden md:table-cell">Bio</TableHead>
                          <TableHead className="hidden md:table-cell">Socials</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers.map((member) => (
                          <TableRow key={member.name}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell className="hidden md:table-cell max-w-xs truncate">
                              {member.bio.substring(0, 80)}...
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex space-x-2">
                                {member.socials.linkedin && (
                                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                    LI
                                  </a>
                                )}
                                {member.socials.github && (
                                  <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                                    GH
                                  </a>
                                )}
                                {member.socials.x && (
                                  <a href={member.socials.x} target="_blank" rel="noopener noreferrer">
                                    X
                                  </a>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="h-8">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-6 shadow-md border border-border">
                  <h2 className="text-2xl font-semibold mb-6">Add Team Member</h2>
                  
                  <Form {...teamForm}>
                    <form onSubmit={teamForm.handleSubmit(onTeamSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={teamForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={teamForm.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <FormControl>
                                <Input placeholder="Developer Advocate" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={teamForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Short bio of the team member" 
                                className="min-h-24"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={teamForm.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Image URL</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input 
                                  placeholder="https://example.com/photo.jpg" 
                                  {...field} 
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={teamForm.control}
                          name="linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>LinkedIn URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://linkedin.com/in/..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={teamForm.control}
                          name="github"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>GitHub URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://github.com/..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={teamForm.control}
                          name="x"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>X (Twitter) URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://x.com/..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full sm:w-auto bg-sui-blue hover:bg-sui-blue-dark"
                        disabled={isTeamSubmitting}
                      >
                        {isTeamSubmitting ? 'Adding...' : 'Add Team Member'}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
