import { ArrowUpIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { scrollToElement } from '@/lib/animation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-sui-navy-dark text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/suity.png" // Replace with your image link
                alt="Logo"
                className="h-10 w-10 rounded-full"
              />
              <span className="font-medium text-lg">Sui On Campus</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              A community-driven initiative bringing blockchain education, events, and hackathons to university campuses worldwide.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/suioncampus" className="text-white/80 hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Team', 'Events'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToElement(item.toLowerCase().replace(' ', '-'))}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-white/70">
              <li>hello@suioncampus.org</li>
              <li>Global</li>
            </ul>
            <a 
              href="https://t.me/suinigeria" // Replace with the desired link
              className="mt-6 bg-white text-sui-navy-dark hover:bg-white/90 py-2 px-4 rounded inline-block"
              id="contact"
            >
              Get in Touch
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {currentYear} Sui On Campus. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <p className="text-white/50 text-sm">
              Powered by Sui Blockchain
            </p>
            <button 
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full bg-sui-blue/20 hover:bg-sui-blue/30 flex items-center justify-center transition-colors"
            >
              <ArrowUpIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;