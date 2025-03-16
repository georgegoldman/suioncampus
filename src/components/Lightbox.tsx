
import { useEffect } from 'react';
import { GalleryImage } from '@/data/gallery';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const Lightbox = ({ image, onClose }: LightboxProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-4xl w-full mx-4 animate-scale-in">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 text-white z-10 bg-black/20 hover:bg-black/40"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="bg-sui-navy-light rounded-lg overflow-hidden shadow-2xl dark:card-glow">
          <img 
            src={image.src} 
            alt={image.alt}
            className="w-full h-auto object-contain"
          />
          
          <div className="p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-medium">{image.title}</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/80">{image.year}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-sui-purple/20 text-sui-purple-light">
                  {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                </span>
              </div>
            </div>
            <p className="text-white/80">{image.description}</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0" onClick={onClose} />
    </div>
  );
};

export default Lightbox;
