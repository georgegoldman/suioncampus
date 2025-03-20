
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, UserPlus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();

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
            {user ? (
              <UserMenu />
            ) : null}
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
                  {!user && (
                    <>
                      <Link 
                        to="/sign-in"
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/sign-up"
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
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
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2"
                    onClick={() => navigate('/sign-in')}
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                  <Button 
                    className="bg-sui-blue hover:bg-sui-blue-dark text-white"
                    onClick={() => navigate('/sign-up')}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
