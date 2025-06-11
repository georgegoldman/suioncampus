import { ArrowUpIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { scrollToElement } from '@/lib/animation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="">
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
            <p className=" mb-6 max-w-md">
              A community-driven initiative bringing blockchain education, events, and hackathons to university campuses worldwide.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/suioncampus" target="_blank" rel="noopener noreferrer" className="">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="">
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
                    className=""
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><a href="mailto:info@suioncampus.org">info@suioncampus.org</a></li>
              <li>Global</li>
            </ul>
            <a 
              href="https://t.me/suinigeria" // Replace with the desired link
              className="mt-6 py-2 px-4 rounded inline-block"
              id="contact"
            >
              Get in Touch
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className=" text-sm mb-4 md:mb-0">
            © {currentYear} Sui On Campus. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <p className=" text-sm">
              Powered by Sui Foundation
            </p>
            <button 
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full flex items-center justify-center
              bg-gray-200 text-gray-700 hover:bg-gray-300 
             dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
             transition duration-200
               "
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