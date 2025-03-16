
import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MotionDivProps = {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'scale-in' | 'slide-in' | 'float' | 'pulse-slow';
  delay?: number;
  threshold?: number;
  once?: boolean;
};

const MotionDiv = ({ 
  children, 
  className, 
  animation = 'fade-in', 
  delay = 0,
  threshold = 0.2,
  once = true
}: MotionDivProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, once]);
  
  const delayClass = delay > 0 
    ? `animate-delay-${delay * 100}` 
    : '';
  
  return (
    <div 
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation} ${delayClass}` : 'opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
};

export default MotionDiv;
