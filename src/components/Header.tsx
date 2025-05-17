
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, UserPlus,CalendarIcon, ImageIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import Logo from './Logo';

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
    { text: 'Events', href: '/events', icon: <CalendarIcon className="h-5 w-5" /> },
  { text: 'Gallery', href: '/gallery', icon: <ImageIcon className="h-5 w-5" /> },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isHomePage ? 
          'bg-background/80 backdrop-blur-md border-b py-2' : 
          'bg-transparent py-2'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Logo />
        
      
          <div className="flex items-center gap-8">
            {user ? (<>
              <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <a 
                  key={item.text}
                  href={item.href}
                  className={cn(
                    "font-medium flex items-center gap-2 transition-colors",
                    location.pathname === item.href 
                      ? "text-gray-900 dark:text-white" 
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  )}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.text}</span>
                </a>
                            ))}
            </nav>
            </>) : (
              <></>
            )}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <Button 
                    // variant="ghost" 
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 
             dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
             transition duration-200"
                    onClick={() => navigate('/sign-in')}
                  >
                    Sign In
                  </Button>
                  {/* <Button 
                    className=""
                    onClick={() => navigate('/sign-up')}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button> */}
                </>
              )}
            </div>
          </div>
        
      </div>
    </header>
  );
};

export default Header;
