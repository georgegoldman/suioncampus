
import { useState, useEffect } from 'react';
import { galleryImages, GalleryImage } from '@/data/gallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryFilters from '@/components/GalleryFilters';
import { FilterCategory, FilterYear } from '@/components/GalleryFilters';
import GalleryCard from '@/components/GalleryCard';
import Lightbox from '@/components/Lightbox';
import { Link } from 'react-router-dom';
import { ArrowLeft, Grid3X3, Grid2X2, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [activeYear, setActiveYear] = useState<FilterYear>('all');
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(galleryImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'columns'>('grid');

  // Extract unique years from gallery data
  const years = [...new Set(galleryImages.map(img => img.year))].sort((a, b) => b - a);

  useEffect(() => {
    let result = [...galleryImages];
    
    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter(img => img.category === activeCategory);
    }
    
    // Apply year filter
    if (activeYear !== 'all') {
      result = result.filter(img => img.year === activeYear);
    }
    
    setFilteredImages(result);
  }, [activeCategory, activeYear]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link to="/">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gradient mb-2">Gallery</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Explore photos from our past events, hackathons, and workshops at campuses around the world.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant={layoutMode === 'grid' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setLayoutMode('grid')}
                className="rounded-md"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={layoutMode === 'columns' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setLayoutMode('columns')}
                className="rounded-md"
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="md:w-1/4 mb-6 md:mb-0">
              <div className="bg-card rounded-lg p-6 sticky top-24">
                <div className="mb-6">
                  <Logo className="mb-6 text-xl" />
                  <div className="text-sm text-muted-foreground">
                    <ImageIcon className="inline-block mr-2 h-4 w-4" />
                    <span>{filteredImages.length} photos</span>
                  </div>
                </div>
                
                <GalleryFilters
                  years={years}
                  onCategoryChange={setActiveCategory}
                  onYearChange={setActiveYear}
                  activeCategory={activeCategory}
                  activeYear={activeYear}
                />
              </div>
            </div>
            
            <div className="md:w-3/4">
              {filteredImages.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground">No images found with the selected filters.</p>
                </div>
              ) : (
                <div className={`${layoutMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'}`}
                >
                  {filteredImages.map(image => (
                    <GalleryCard
                      key={image.id}
                      image={image}
                      onClick={() => setSelectedImage(image)}
                      className={layoutMode === 'columns' ? 'mb-6 break-inside-avoid' : ''}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Gallery;
