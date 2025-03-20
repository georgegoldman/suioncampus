
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          <div className="bg-card rounded-xl p-8 border mb-8">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <div className="shrink-0">
                <img 
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
                  alt={user?.name || 'User'} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-background"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
                <p className="text-muted-foreground">{user?.email || 'user@example.com'}</p>
                
                <div className="mt-4">
                  <p>Member since: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-4">Your Registered Events</h3>
              <p className="text-muted-foreground">You haven't registered for any events yet.</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
              <p className="text-muted-foreground mb-4">Manage your account settings and preferences.</p>
              <div className="space-y-2">
                <p>• Update profile information</p>
                <p>• Change password</p>
                <p>• Notification preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
