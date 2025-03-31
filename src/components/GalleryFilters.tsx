
import { useState } from 'react';
import { Button } from './ui/button';

export type FilterCategory = 'all' | 'event' | 'hackathon' | 'workshop';
export type FilterYear = 'all' | number;

interface GalleryFiltersProps {
  years: number[];
  onCategoryChange: (category: FilterCategory) => void;
  onYearChange: (year: FilterYear) => void;
  activeCategory: FilterCategory;
  activeYear: FilterYear;
}

const GalleryFilters = ({ 
  years, 
  onCategoryChange, 
  onYearChange, 
  activeCategory, 
  activeYear 
}: GalleryFiltersProps) => {
  const categories: FilterCategory[] = ['all', 'event', 'hackathon', 'workshop'];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={activeCategory === category ? 
              "bg-sui-purple hover:bg-sui-purple/90" : 
              "hover:border-sui-purple/50"
            }
          >
            {category === 'all' ? 'All Categories' : 
              category.charAt(0).toUpperCase() + category.slice(1) + 's'}
          </Button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeYear === 'all' ? "default" : "outline"}
          size="sm"
          onClick={() => onYearChange('all')}
          className={activeYear === 'all' ? 
            "bg-sui-blue hover:bg-sui-blue/90" : 
            "hover:border-sui-blue/50"
          }
        >
          All Years
        </Button>
        
        {years.map(year => (
          <Button
            key={year}
            variant={activeYear === year ? "default" : "outline"}
            size="sm"
            onClick={() => onYearChange(year)}
            className={activeYear === year ? 
              "bg-sui-blue hover:bg-sui-blue/90" : 
              "hover:border-sui-blue/50"
            }
          >
            {year}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GalleryFilters;
