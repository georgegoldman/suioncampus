import Header from "@/components/Header";
import ManageAccessCard from "@/components/ManageAccessCard";
import { MapPin, Tag, Calendar, User, ArrowUpRight } from 'lucide-react';
import { fetchAnEvent, EventItem, joinEvent } from "@/data/events";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";


  

const ViewEvent = () => {
    const [selectedEvent, setSelectedEvent] = useState<EventItem>(null);
    const [showModal, setShowModal] = useState(false);
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<EventItem | null>(null);
    const [loading, setLoading] = useState(true)
    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (date) => `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
  const { user } = useAuth();
    const openEventModal = (event) => {
    setSelectedEvent(event);
    setTimeout(() => setShowModal(true), 10)
  };

  const closeEventModal = () => {
    setShowModal(false);
    setTimeout(() => {

      setSelectedEvent(null);
    }, 300)
  }

    
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
                                <div className="col-md-5 col-12 h-full lg:px-10 relative">
                                    <img
                                        src={event.image}
                                        alt="event"
                                        className="rounded-md object-cover w-full h-full"
                                    />
                                    <div className="my-2">
                                        {/* { ['admin', 'superadmin'].includes(user?.role) &&  <ManageAccessCard /> } */}
                                        {user?.admin && <ManageAccessCard />}
                                        
                                    </div>
                                    <p className="lg:py-2 lg:pt-5 pt-3 py-1"><strong>Hosted by</strong></p>
                                    <hr />
                                    <div className="d-flex justify-content-between py-2">
                                        <p>SUIONCAMPUS</p>
                                        <p><a href="https://x.com/suioncampus" target="blank" >
                                        <i className="fa-brands fa-x-twitter"></i>
                                        </a></p>
                                    </div>
                                    <a href="mailto:support@suioncampus.org">Contact the Host</a>
                                </div>

                                <div className="col-md-7 col-12 h-full lg:px-1 relative">
                                    <div className="w-full max-w-md">
                                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                                            {event.name}
                                        </h1>
                                    </div>

                                    <div className="flex items-center mt-2">
                                          <Calendar className="mr-1 w-5 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 dark:text-gray-300" />
                                          <p className="text-xs sm:text-sm md:text-base">
                                                <span>{event.start_time.toDateString()}</span> <br />
                      <span>{event.start_time.toLocaleTimeString()} - {event.end_time.toLocaleTimeString()}</span>
                                            </p>

                                    </div>

                                    <div className="flex items-center mt-2 ">
                                          <MapPin className="mr-1 w-5 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 dark:text-gray-300" />
                                          <p className="text-xs sm:text-sm md:text-base">
                                                <span>{event.location}</span>
                                            </p>

                                    </div>

                                    <div className="mt-3 flex gap-3">
  <button onClick={() => openEventModal(event)}
  className="flex-1 bg-zinc-200 text-black font-semibold py-2 rounded-lg hover:bg-zinc-300 transition">
    Edit
  </button>
  <button className="flex-1 bg-zinc-200 text-black font-semibold py-2 rounded-lg hover:bg-zinc-300 transition">
    Change Photo
  </button>
</div>


                                    
<div className="mt-10 bg-gray-200 text-gray-700 hover:bg-gray-300 
             dark:bg-transparent dark:text-white dark:hover:bg-zinc-800
             transition duration-200 rounded-xl shadow-lg overflow-hidden border border-zinc-800">
  <div className="px-6 py-4">
    <div className="text-gray-700 dark:text-white text-sm font-medium mb-2">Registration</div>
    <p className="text-sm mb-4">
      Welcome! To join the event, please register below.
    </p>
    <div className="flex items-center gap-3 mb-4">
      <img className="h-10 w-10 rounded-full" src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars/ai/5f445565-7f26-44b4-9aa3-afe408c1d159.jpg" alt="Avatar" />
      <div>
        <div className="font-semibold">{user.name}</div>
      </div>
    </div>
    <button className="w-full dark:bg-white dark:text-black font-semibold py-2 rounded-lg hover:bg-zinc-200 transition">
      Register
    </button>
  </div>
</div>


<p className="mt-3">About Event</p>
<hr />
<p className="mt-2 me-1">
        {event.description}
</p>
<p className="mt-3">Location</p>
<hr />
<p className="mt-1">
    {event.location}
</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-12"></div>
                    </div>
                </div>
            </main>

            {/* Event Details Modal - Full Width on Mobile */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/20 dark:bg-white/10 transition-opacity duration-300 ease-in-out"
            onClick={closeEventModal}
          ></div>
  
          {/* Slide-in Panel */}
          <div
            className={`relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-full shadow-lg transform transition-transform duration-300 ease-in-out ${
    showModal ? 'translate-x-0' : 'translate-x-full'
  }`}
          >
            <div className="p-4 sm:p-6 overflow-y-auto h-full">
  {/* Top-right buttons */}
  <div className="flex justify-start items-center space-x-3 mb-2">
    <button
        onClick={closeEventModal}

  className="px-2  py-2 rounded-md text-sm font-medium
             bg-gray-200 text-gray-700 hover:bg-gray-300 
             dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
             transition duration-200 flex items-center gap-2"
>
 <i className="fa-solid fa-angles-right"></i>
</button>

    <p
      className=""
    >
      Edit Event
    </p>
  </div>

  <div className="pt-5 mb-4 flex justify-center">
    <img
      src={selectedEvent.image}
      alt="event"
      className="rounded-md object-cover w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-[40%]"
    />
  </div>

  <div className="mb-2">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">
      {selectedEvent.name}
    </h1>
  </div>

  <p className="font-medium mb-1"><strong>Hosted by: Sui on campus</strong></p>

  <div className="flex items-start text-sm text-gray-700 dark:text-gray-300 mb-4 space-x-6">
    {/* Date/Time */}
    <div className="flex items-center">
      <Calendar className="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 dark:text-gray-300" />
      <p className="text-sm sm:text-base md:text-lg">
        Start: {`${formatDate(selectedEvent.start_time)} ${formatTime(selectedEvent.start_time)}`}
      </p>
    </div>

    {/* Location */}
    <div className="flex items-center">
      <MapPin className="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
      <p className="text-sm sm:text-base md:text-lg">
        {selectedEvent.location}
      </p>
    </div>
  </div>




  <h3 className="font-medium mb-2">About Event</h3>
  <p className="mb-4">{selectedEvent.description}</p>

  <p className="font-medium mb-1" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={20} />
     {selectedEvent.attendees.length}</p>
  
</div>

          </div>
        </div>
      )}
    
        </div>
    );
}

export default ViewEvent;