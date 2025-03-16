
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { scrollToElement } from '@/lib/animation';
import { ThemeToggle } from './ThemeToggle';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-background/80 backdrop-blur-lg shadow-md'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sui-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <h1 className="text-lg font-semibold">Sui On Campus</h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {isHomePage ? (
            <>
              <button
                onClick={() => scrollToElement('mission')}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Mission
              </button>
              <button
                onClick={() => scrollToElement('team')}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Team
              </button>
              <button
                onClick={() => scrollToElement('events')}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Events
              </button>
            </>
          ) : (
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
          )}
          <Link to="/gallery" className="text-foreground/80 hover:text-foreground transition-colors">
            Gallery
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button size="sm" className="bg-gradient-to-r from-sui-blue to-sui-purple text-white">
            Join Us
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
