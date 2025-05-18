import Header from "@/components/Header";
import ManageAccessCard from "@/components/ManageAccessCard";
import { MapPin, Tag, Calendar, User, ArrowUpRight } from 'lucide-react';
import { fetchAnEvent, EventItem, joinEvent } from "@/data/events";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ManageEventCard from "@/components/ManageEventCard";


  

const ManageEvent = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<EventItem | null>(null);
    const [loading, setLoading] = useState(true)
    const { user }  = useAuth();
    useEffect(() => {
        const loadEvent = async () => {
                console.log("Fetching event with ID:", eventId);

            if (!eventId) {
                      console.warn("eventId is undefined");
return;
            }
            try {
      const fetchedEvent = await fetchAnEvent(eventId);
      console.log("Fetched Event:", fetchedEvent);
      setEvent(fetchedEvent);
    } catch (err) {
      console.error("Error loading event:", err);
    } finally {
      setLoading(false); // ensure this always runs
    }
        };
        loadEvent();

    }, [eventId]);

    
    if (loading) return <div className="text-center mt-10">Loading event...</div>;
    if (!event) return <div className="text-center mt-10 text-red-500">Event not found.</div>;
    return (
        <div>
            <Header />
            
            <main className="flex-1 pt-16 md:pt-24 pb-16">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-12">
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="row">
                                <div className=" flex flex-wrap items-center justify-between gap-4 w-full">
  <h1 className="ps-4 text-xl sm:text-2xl md:text-3xl font-bold">
    {event.name}
  </h1>

  <button
    onClick={() => window.open(`/event/${event.id}`, '_blank')}
    className="ps-3 py-1 rounded-md text-sm font-medium
               bg-gray-200 text-gray-700 hover:bg-gray-300 
               dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
               transition duration-200 flex items-center gap-2"
  >
    Event Page
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
      fill="none"
      viewBox="0 0 48 48"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M32 16l-12 12M32 16l-6 0M32 16l0 6"
      />
    </svg>
  </button>
</div>

            
                            <ManageEventCard event={event} />
                            </div>
                        </div>
                        <div className="col-md-2 col-12"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ManageEvent;