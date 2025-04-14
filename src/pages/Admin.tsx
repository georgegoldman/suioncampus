
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import EventsManagementPage from '@/components/admin/EventsManagementPage';
import api from '@/api';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  
  // If not logged in
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
          const res = await api.get(
            "/events/upcoming"
          );
          console.log(res.data)
          setEvents(res.data || [])
        } catch (err) {
          if (err.response?.status === 404) {
            setError("No events found");
            setEvents([]);
          } else {
            setError(err.response?.data?.message || "Failed to fetch events");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchEvents();
    }
  , []);

  if (!user) return null; // to avoid rendering before redirect

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
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
                <EventsManagementPage  />
              </TabsContent>
              
              <TabsContent value="team" className="space-y-8">
                <div className="bg-card rounded-lg p-6 shadow-md border border-border">
                  <h2 className="text-2xl font-semibold mb-6">Team Management</h2>
                  <p className="text-muted-foreground">
                    Team management functionality would be implemented here similar to events management.
                  </p>
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
