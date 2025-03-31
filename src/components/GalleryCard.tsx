
import { useState } from 'react';
import { GalleryImage } from '@/data/gallery';
import { cn } from '@/lib/utils';

interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
}

const GalleryCard = ({ image, onClick }: GalleryCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer hover-lift"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <img 
          src={image.src} 
          alt={image.alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-medium">{image.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-white/80">{image.year}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
