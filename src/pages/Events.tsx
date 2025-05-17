/* eslint-disable @typescript-eslint/no-unused-expressions */
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/api";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaCalendarAlt } from 'react-icons/fa';
import { EventItem, fetchUpcomingOrPastEvents } from "@/data/events";
import {TimelineEvent} from "@/components/TimelineEvent";





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
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
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
        const data = await fetchUpcomingOrPastEvents(activeTab);
        
        activeTab === "upcoming"
          ? setUpcomingEvents(data || [])
          : setPastEvents(data || []);
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

  const truncateText = (text: string, maxLength = 75) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  

  return (
    <div>
      <Header />
      <main className="flex-1 pt-16 md:pt-24 pb-16">
        <div className="container px-4 sm:px-6">
          <div className="">
            {/* Header Section with Responsive Layout */}
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className=" col-md-12 justify-between">
                  <div className="col-md-12 ">
                    <div className="row">
<div className="flex mt-16 items-center justify-between flex-wrap gap-4 w-full">
  {/* Heading */}
  <h1 className="text-2xl font-bold">Events</h1>

  {/* Toggle Switch */}
  <div className="relative flex w-40 bg-gray-200 rounded-full p-1 overflow-hidden">
    <motion.div
      layout
      initial={false}
      animate={{ x: activeTab === "past" ? "100%" : "0%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute top-0 left-0 w-1/2 h-full bg-white border border-black rounded-full shadow-md z-0"
    />
    <button
      onClick={() => setActiveTab("upcoming")}
      className={`z-10 w-1/2 text-sm py-2 transition-colors duration-300 ${
        activeTab === "upcoming" ? "text-black font-semibold" : "text-gray-500"
      }`}
    >
      Upcoming
    </button>
    <button
      onClick={() => setActiveTab("past")}
      className={`z-10 w-1/2 text-sm py-2 transition-colors duration-300 ${
        activeTab === "past" ? "text-black font-semibold" : "text-gray-500"
      }`}
    >
      Past
    </button>
  </div>
</div>



                    </div>
                  </div>
                
                <div className="row mt-3">

                <div className="col-12">
                  {/* Events Content */}

                  <div className="">
                    <AnimatePresence mode="wait">
                      {activeTab === "upcoming" ? (
  <motion.div
    key="upcoming"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
  >
    {loading ? (
      <p className="text-gray-500">Loading upcoming events...</p>
    ) : upcomingEvents.length === 0 ? (
      <NoEvents past={false} />
    ) : (
      upcomingEvents.map((event) => (
        <TimelineEvent key={event.id} event={event} onClick={() => openEventModal(event)} />
      ))
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
    {loading ? (
      <p className="text-gray-500">Loading past events...</p>
    ) : pastEvents.length === 0 ? (
      <NoEvents past />
    ) : (
      pastEvents.map((event) => (
        <TimelineEvent key={event.id} event={event} onClick={() => openEventModal(event)} />
      ))
    )}
  </motion.div>
)}

                    </AnimatePresence>
                  </div>

                </div>

                </div>

                </div>
              </div>
              <div className="col-3"></div>
            </div>
            
            
            
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
              <button onClick={closeEventModal} className="float-right text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
              <div className="pt-5 mb-4 flex justify-center">
  <img
    src={selectedEvent.image}
    alt="event"
    className="rounded-md object-cover w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-[40%]"
  />
</div>

              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold">{selectedEvent.name}</h1>
              </div>
              <h3 className="font-medium mb-2">About Event</h3>
              <p className="mb-4">{selectedEvent.description}</p>
  
              <div className="flex items-start text-sm text-gray-600 mb-4">
                <span className="material-symbols-outlined mr-2">
                  calendar_month
                </span>
                <p>Start: {selectedEvent.start_date}</p>
              </div>
  
              <p className="font-medium mb-1">Hosted by</p>
              <p className="mb-4">Sui on campus</p>
  
              <p className="font-medium mb-1">Attendees</p>
              {/* <p>{event.attendees}</p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
