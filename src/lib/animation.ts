
export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Add staggered animation delay for children elements
export const getStaggeredDelay = (index: number, baseDelay = 0.1): string => {
  const delay = baseDelay * index;
  return `${delay}s`;
};

// Helper for staggered children animations
export const staggeredChildren = (staggerDuration = 0.1, initialDelay = 0) => {
  return (index: number): string => {
    return `${initialDelay + (index * staggerDuration)}s`;
  };
};

// Animation variants for framer-motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Gallery masonry calculation helper
export const getMasonrySpan = (index: number): string => {
  // Create an interesting pattern for the gallery
  // Some images will span 2 columns or 2 rows
  const patterns = [
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
    'col-span-1 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
  ];
  
  return patterns[index % patterns.length];
};
