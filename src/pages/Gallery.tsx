
import { useState, useEffect } from 'react';
import { galleryImages, GalleryImage } from '@/data/gallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryFilters from '@/components/GalleryFilters';
import { FilterCategory, FilterYear } from '@/components/GalleryFilters';
import GalleryCard from '@/components/GalleryCard';
import Lightbox from '@/components/Lightbox';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [activeYear, setActiveYear] = useState<FilterYear>('all');
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(galleryImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
          <div className="mb-8">
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
          
          <GalleryFilters
            years={years}
            onCategoryChange={setActiveCategory}
            onYearChange={setActiveYear}
            activeCategory={activeCategory}
            activeYear={activeYear}
          />
          
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No images found with the selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map(image => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          )}
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
