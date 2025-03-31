
import { Link } from 'react-router-dom';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sui-blue to-sui-purple flex items-center justify-center">
        <span className="text-white font-bold text-lg">S</span>
      </div>
      <span className="text-xl md:text-2xl font-bold text-gradient">Sui On Campus</span>
    </Link>
  );
};

export default Logo;
