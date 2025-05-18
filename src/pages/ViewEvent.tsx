import Header from "@/components/Header";
import ManageAccessCard from "@/components/ManageAccessCard";
import { MapPin, Tag, Calendar, User, ArrowUpRight } from 'lucide-react';
import { fetchAnEvent, EventItem } from "@/data/events";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const ViewEvent = () => {
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
                                <div className="col-md-5 col-12 h-full lg:px-10 relative">
                                    <img
                                        src={event.image}
                                        alt="event"
                                        className="rounded-md object-cover w-full h-full"
                                    />
                                    <div className="my-2">
                                        {/* { ['admin', 'superadmin'].includes(user?.role) &&  <ManageAccessCard /> } */}
                                        {!user?.admin && <ManageAccessCard />}
                                        
                                    </div>
                                    <p className="lg:py-2 lg:pt-5 pt-3 py-1"><strong>Hosted by</strong></p>
                                    <hr />
                                    <div className="d-flex justify-content-between py-2">
                                        <p>SUIONCAMPUS</p>
                                        <p><a href="https://x.com/suioncampus">X</a></p>
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

<div className=" mt-10 bg-gray-200 text-gray-700 hover:bg-gray-300 
             dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
             transition duration-200  rounded-xl shadow-lg overflow-hidden border border-zinc-800">
  <div className="px-6 py-4">
    <div className="text-gray-700 dark:text-white text-sm font-medium mb-2">Registration</div>
    <p className="text-sm mb-4">
      Welcome! To join the event, please register below.
    </p>
    <div className="flex items-center gap-3 mb-4">
      <img className="h-10 w-10 rounded-full" src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars/ai/5f445565-7f26-44b4-9aa3-afe408c1d159.jpg" alt="Avatar" />
      <div>
        <div className="font-semibold">{user.name}</div>
        {/* <div className="dark:text-white text-sm">georgegoldmanjohn.o@gmail.com</div> */}
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
        </div>
    );
}

export default ViewEvent;