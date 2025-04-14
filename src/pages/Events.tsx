/* eslint-disable @typescript-eslint/no-unused-expressions */
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/api";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaCalendarAlt } from 'react-icons/fa';


type Event = {
  id: string,
  name: string,
  start_date: string,
  end_date: string,
  location: string
};

const NoEvents = ({ past = false }) => (
  <div className="flex flex-col items-center justify-center text-center py-10">
    <DotLottieReact
      src="https://lottie.host/37c7a886-ee01-49e7-832b-d00db63b7032/hDkqQy4Qyj.lottie"
      loop
      autoplay
    />
    {/* <img src="https://lottie.host/37c7a886-ee01-49e7-832b-d00db63b7032/hDkqQy4Qyj.lottie" alt="No Events" className="w-20 h-20 mb-4 opacity-70" /> */}
    <h2 className="text-lg font-semibold text-gray-600">
      {past ? "No Past Events" : "No Upcoming Events"}
    </h2>
    <p className="text-sm text-gray-500 mt-1">
      {past
        ? "You haven't hosted or attended any past events."
        : "Looks like you have no upcoming events yet."}
    </p>
  </div>
);

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    if (selectedEvent) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(
          activeTab === "upcoming" ? "/events/upcoming" : "/events/past"
        );
        console.log(res.data)
        activeTab === "upcoming"
          ? setUpcomingEvents(res.data || [])
          : setPastEvents(res.data || []);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("No events found");
          activeTab === "upcoming"
            ? setUpcomingEvents([])
            : setPastEvents([]);
        } else {
          setError(err.response?.data?.message || "Failed to fetch events");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [activeTab, selectedEvent]);

  return (
    <div>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-5 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="col-2"></div>

            <div className="col-8 relative">
              <div className="absolute top-0 start-0">
                <div className="fs-1 font-bold">Events</div>
              </div>

              {/* Toggle Switch */}
              <div className="absolute top-0 end-0">
                <div className="relative flex w-52 bg-gray-200 rounded-full p-1 overflow-hidden">
                  <motion.div
                    layout
                    initial={false}
                    animate={{ x: activeTab === "past" ? "100%" : "0%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-white border border-black rounded-full shadow-md z-0"
                  />
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`z-10 w-1/2 text-sm py-2  transition-colors duration-300 ${
                      activeTab === "upcoming" ? "text-black font-semibold" : "text-gray-500"
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`z-10 w-1/2 text-sm py-2  transition-colors duration-300 ${
                      activeTab === "past" ? "text-black font-semibold" : "text-gray-500"
                    }`}
                  >
                    Past
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-3 col-12">
                <AnimatePresence mode="wait">
                  {activeTab === "upcoming" ? (
                    <motion.div
                      key="upcoming"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
                      {loading && <p>Loading upcoming events...</p>}
                      {!loading && error === "No events found" && <NoEvents />}
                      {!loading && !error && upcomingEvents.length === 0 && <NoEvents />}
                      {!loading && !error && upcomingEvents.length > 0 && (
                        // <ul className="list-disc list-inside">
                        //   {upcomingEvents.map((event) => (
                        //     <li key={event.id}>
                        //       <span className="font-medium">{event.name}</span> –{" "}
                        //       <span className="text-sm text-gray-500">{event.date}</span>
                        //     </li>
                        //   ))}
                        // </ul>
                        <div className="relative border-l-2 border-gray-300 ml-6 mt-10">
                          {upcomingEvents.map((event) => (
                            <div key={event.id} className="mb-12 flex items-start relative"
                             onClick={() => openEventModal(event)}>
                              {/* Left date section */}
                              <div className="absolute -left-28 text-right w-24 pr-1">
                                <div className="text-sm font-bold text-gray-700">{event.start_time}</div>
                                <div className="text-xs text-gray-500">{event.end_time}</div>
                              </div>

                              {/* Dot */}
                              <div className="w-1 h-4 bg-blue-500 rounded-full mt-1 ml-1 z-10"></div>

                              {/* Card */}
                              <div className="ml-6 rounded-xl shadow-md p-4 w-full flex justify-between">
                                <div className="col-6">
                                  
                                  <div className="text-sm text-gray-500">{event.start_time}</div>
                                  <div className="text-md font-semibold">{event.name}</div>
                                  <div className="text-sm text-gray-600">By {event.host_id["$oid"]}</div>

                                  {/* Tags (optional) */}
                                  <div className="flex gap-2 mt-2">
                                    {/* Add tags here */}
                                  </div>

                                  {/* Event Poster */}
                                  
                                </div>
                                <div className="col-6">
                                <img
                                    src={ "https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//overflowabj.jpeg"}
                                    alt="event"
                                    className="rounded-md object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="past"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-lg font-semibold mb-2">Past Events</h2>
                      {loading && <p>Loading past events...</p>}
                      {!loading && error === "No events found" && <NoEvents past />}
                      {!loading && !error && pastEvents.length === 0 && <NoEvents past />}
                      {!loading && !error && pastEvents.length > 0 && (
                        <ul className="list-disc list-inside">
                          {pastEvents.map((event) => (
                            <div key={event.id} className="mb-12 flex items-start relative" 
                            onClick={() => openEventModal(event)}>
                            {/* Left date section */}
                            <div className="absolute -left-28 text-right w-24 pr-1">
                              <div className="text-sm font-bold text-gray-700">{event.start_time}</div>
                              <div className="text-xs text-gray-500">{event.end_time}</div>
                            </div>

                            {/* Dot */}
                            <div className="w-1 h-4 bg-blue-500 rounded-full mt-1 ml-1 z-10"></div>

                            {/* Card */}
                            <div className="ml-6 rounded-xl shadow-md p-4 w-full flex justify-between">
                              <div className="col-6">
                                
                                <div className="text-sm text-gray-500">{event.start_time}</div>
                                <div className="text-md font-semibold">{event.name}</div>
                                <div className="text-sm text-gray-600">By {event.host_id["$oid"]}</div>

                                {/* Tags (optional) */}
                                <div className="flex gap-2 mt-2">
                                  {/* Add tags here */}
                                </div>

                                {/* Event Poster */}
                                
                              </div>
                              <div className="col-6">
                              <img
                                  src={ "https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//overflowabj.jpeg"}
                                  alt="event"
                                  className="rounded-md object-cover"
                                />
                              </div>
                            </div>
                          </div>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="col-2"></div>
            {selectedEvent && (
              <div className="fixed inset-0 z-50 flex justify-end">
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out"
                  onClick={closeEventModal}
                ></div>

                {/* Slide-in Panel */}
                <div
                  className={`relative bg-white w-1/3 h-full shadow-lg transform transition-transform duration-300 ease-in-out ${
                    showModal ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  <div className="p-6 overflow-y-auto h-full">
                  <button onClick={closeEventModal} className=" float-end text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    <div className="items-center mb-4 justify-between pt-5 flex">
                    <img
                      src={ "https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/suioncampus//overflowabj.jpeg"}
                      alt="event"
                      className="rounded-md object-cover"
                    />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
                    </div>
                    <h3>About Event</h3>
                    <p>{selectedEvent.description}</p> <br />

                    <div className="flex items-start text-sm text-gray-600">
                      <span className="material-symbols-outlined me-2">
                        calendar_month
                      </span>
                    <p className="text-sm text-gray-600 mb-2">Start: {selectedEvent.start_time}</p>

                    </div> <br />
                      

                    {/* <p className="text-sm text-gray-600 mb-2">End: {selectedEvent.end_time}</p>
                    <p className="text-sm text-gray-600 mb-4">Organized by: {selectedEvent.name}</p> */}
                    <p>Hosted by</p> 
                    <p>Sui on campus</p> <br />

                    <p>Attendees</p>
                    <p>{event.attendees}</p>

                    
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
