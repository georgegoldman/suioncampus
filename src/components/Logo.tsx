import { useIsMobile } from '@/hooks/use-mobile';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "" }: { className?: string }) => {
  // const isMobile = useIsMobile;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="SOC ICON SEA SVG.svg" // Replace with your image link
        alt="Logo"
        className="h-5 w-5"
      />
      <span className="text-xl md:text-2xl font-bold text-gradient">
      {isMobile ? "" : "Sui On Campus"}

      </span>
    </Link>
  );
};

export default Logo;

