import { ArrowUpRight } from 'lucide-react'; // optional icon lib
import React from 'react';

const ManageAccessCard = () => {
  return (
     <div className="inline-flex items-center justify-between px-4 py-2 rounded-xl 
      bg-white/10 dark:bg-zinc-900/40 
      backdrop-blur-md 
      border border-zinc-300 dark:border-zinc-800 
      text-zinc-800 dark:text-rose-200 
      shadow-md space-x-4">
      
      <p className="text-sm">
        You have manage access for this event.
      </p>

      <a
        href="/manage"
        className="inline-flex items-center bg-rose-700 hover:bg-rose-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
      >
        Manage <ArrowUpRight className="ml-1 w-4 h-4" />
      </a>
    </div>
  );
};

export default ManageAccessCard;
