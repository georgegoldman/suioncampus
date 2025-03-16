
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === '/';
  
  const navItems = [
    { text: 'Home', href: '/' },
    { text: 'Gallery', href: '/gallery' },
    { text: 'Admin', href: '/admin' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isHomePage ? 
          'bg-background/80 backdrop-blur-md border-b py-4' : 
          'bg-transparent py-6'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-bold flex items-center"
        >
          <span className="text-gradient">Sui On Campus</span>
        </Link>
        
        {isMobile ? (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-6 mt-12">
                  {navItems.map((item) => (
                    <Link 
                      key={item.text}
                      to={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        location.pathname === item.href ? 
                          "text-foreground font-semibold" : 
                          "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.text}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.text}
                  to={item.href}
                  className={cn(
                    "font-medium transition-colors hover:text-sui-blue",
                    location.pathname === item.href ? 
                      "text-foreground" : 
                      "text-muted-foreground"
                  )}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
