
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/lib/animation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    scrollToElement(id);
  };
  
  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Team', id: 'team' },
    { label: 'Events', id: 'events' },
    { label: 'Hackathons', id: 'hackathons' }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "py-2 glass-dark" : "py-4 bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-sui-blue flex items-center justify-center">
            <span className="text-white font-medium">S</span>
          </div>
          <span className="font-medium text-lg">Sui On Campus</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-foreground/80 hover:text-foreground transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sui-blue group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <Button
            onClick={() => handleNavClick('contact')}
            className="bg-sui-blue hover:bg-sui-blue-dark text-white font-medium rounded-full px-6 py-2 transition-all hover:shadow-lg hover:shadow-sui-blue/20"
          >
            Get Involved
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <button 
          className="md:hidden text-foreground"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Mobile menu */}
        <div className={cn(
          "fixed inset-0 z-50 glass-dark transition-all duration-300 md:hidden",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
          <div className="container h-full flex flex-col p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-sui-blue flex items-center justify-center">
                  <span className="text-white font-medium">S</span>
                </div>
                <span className="font-medium text-lg">Sui On Campus</span>
              </div>
              <button onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 items-center justify-center flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-lg font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => handleNavClick('contact')}
                className="mt-4 bg-sui-blue hover:bg-sui-blue-dark text-white font-medium rounded-full px-6 py-2 transition-all hover:shadow-lg hover:shadow-sui-blue/20"
              >
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
