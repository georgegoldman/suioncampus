
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MyEvents = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Events</h1>
          
          <div className="bg-card rounded-xl p-8 border mb-8 text-center">
            <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
            <p>Browse our upcoming events and join the Sui community!</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEvents;
