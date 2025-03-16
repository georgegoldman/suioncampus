
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import TeamSection from '@/components/TeamSection';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to section if URL contains hash
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // For animations and smooth page load
    document.body.classList.add('opacity-100');
    return () => {
      document.body.classList.remove('opacity-100');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Mission />
        <TeamSection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
