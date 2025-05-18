import { useState } from 'react';
import { Calendar, Clock, MapPin, Copy, Users, ArrowUpRight } from 'lucide-react';
import { EventItem } from '@/data/events';

export default function ManageEventCard({event}:{event: EventItem}) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText('lu.ma/a1ccwxoz');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-black text-white rounded-xl overflow-hidden shadow-lg">
      {/* Left Section */}
      <div className="flex flex-col md:flex-row">
        {/* Image and Title Section */}
        <div className="w-full md:w-96 relative">
          <div className="relative">
            <img 
              src={event.image} 
              alt="SUI Builderthon Port Harcourt" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h2 className="text-xl font-bold mb-1">{event.name}</h2>
              <h3 className="text-lg font-semibold">{event.location}</h3>
              
              <div className="flex items-center mt-4">
                <div className="bg-gray-800 rounded-lg p-1 mr-2">
                  <span className="text-xs">{event.start_time.toDateString()}</span>
                  <div className="text-xl font-bold">{event.start_time.toLocaleTimeString()}</div>
                </div>
                
                <div className="ml-2">
                  <p className="text-sm">{event.end_time.toDateString()}</p>
                  <p className="text-xs text-gray-300">{event.end_time.toLocaleTimeString()}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-sm">Register to See Address</p>
                <p className="text-xs text-gray-300">Port Harcourt, Rivers</p>
              </div>
            </div>
          </div>
          
          {/* Hosted By Section */}
          <div className="p-4">
            <p className="text-sm text-gray-400 mb-2">Hosted by</p>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs border-2 border-black">G</div>
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs border-2 border-black">E</div>
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xs border-2 border-black">O</div>
              </div>
              <div className="ml-4">
                <p className="text-xs">George-Goldman Onyedikachi</p>
                <p className="text-xs">Emmanuel Anayo</p>
                <p className="text-xs">Ogoyi Thompson</p>
              </div>
            </div>
            
            {/* URL Section */}
            <div className="mt-4 flex items-center justify-between bg-gray-800 rounded-lg p-2">
              <div className="flex items-center">
                <span className="text-sm">lu.ma/a1ccwxoz</span>
                <ArrowUpRight size={16} className="ml-1" />
              </div>
              <button 
                onClick={handleCopy} 
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs"
              >
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Section - Event Details */}
        <div className="w-full p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">When & Where</h2>
            
            <div className="flex items-start mb-6">
              <div className="mr-4 mt-1">
                <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center">
                  <span className="text-xs text-gray-400">MAY</span>
                  <span className="text-xl font-bold">29</span>
                </div>
              </div>
              
              <div>
                <p className="font-medium">Thursday 29 May</p>
                <p className="text-sm text-gray-300">10:00 - 31 May, 10:00 GMT+1</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <div className="bg-gray-800 rounded-lg p-2">
                  <MapPin size={20} />
                </div>
              </div>
              
              <div>
                <p className="font-medium">Port Harcourt</p>
                <p className="text-sm text-gray-300">Rivers, Nigeria</p>
                <p className="text-sm text-gray-400 mt-4">The address will be shared with guests after they register.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg mb-4">Registration</h3>
            <p className="text-sm mb-4">Welcome! To join the event, please register below.</p>
            
            <div className="bg-gray-800 rounded-lg p-3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs mr-3">G</div>
              <div>
                <p className="text-sm">George-Goldman Onyedikachi</p>
                <p className="text-xs text-gray-400">georgegoldmanjohn@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex-1">
              <Users size={16} />
              <span>Check In Guests</span>
            </button>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
                Edit Event
              </button>
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
                Change Photo
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg mb-2">Share Event</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xl">f</span>
              </button>
              <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xl">X</span>
              </button>
              <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xl">in</span>
              </button>
              <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xl">O</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}