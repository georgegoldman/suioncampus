import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus/new/suity.png" // Replace with your image link
        alt="Logo"
        className="h-9 w-9"
      />
      <span className="text-xl md:text-2xl font-bold text-gradient">Sui On Campus</span>
    </Link>
  );
};

export default Logo;