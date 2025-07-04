/* eslint-disable @typescript-eslint/no-unused-expressions */
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/api";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaCalendarAlt } from "react-icons/fa";
import { EventItem, fetchUpcomingOrPastEvents, joinEvent } from "@/data/events";
import { TimelineEvent } from "@/components/TimelineEvent";
import { MapPin, Tag, Calendar, User, Plus, CalendarOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const TimelineEventSkeleton = () => (
  <div className="relative mb-8 flex animate-pulse">
    {/* Timeline side (dot + dotted line) */}
    <div className="flex flex-col items-center mr-4">
      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full z-10" />
      <div
        className="flex-1 w-px bg-gray-300 dark:bg-gray-600 mt-1"
        style={{ borderStyle: "dotted" }}
      />
    </div>

    {/* Main content wrapper */}
    <div className="flex-1">
      {/* Date badge */}
      <div className="flex items-center mb-3">
        <div className="rounded-full px-4 py-1 bg-gray-200 dark:bg-gray-700 w-24 h-6"></div>
      </div>

      {/* Event card */}
      <div className="flex-1 min-w-0">
        <div className="bg-gray-200 dark:bg-gray-800 lg:pl-1 rounded-lg overflow-hidden shadow-lg flex items-start flex-row gap-4 w-full max-w-full min-w-0">
          {/* Event content */}
          <div className="p-2 sm:p-3 md:p-4 lg:p-2 flex-grow min-w-0 overflow-hidden">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-3"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </div>

          {/* Event image placeholder */}
          <div
            className="p-2 flex-shrink-0 overflow-hidden 
                w-[110px] h-[110px] 
                sm:w-[130px] sm:h-[130px] 
                md:w-[150px] md:h-[150px] 
                lg:w-[160px] lg:h-[160px] 
                xl:w-[140px] xl:h-[140px]"
          >
            <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NoEvents = ({ past = false }) => (
  <div className="flex flex-col items-center justify-center text-center py-10">
    {/* <DotLottieReact
      src="https://lottie.host/37c7a886-ee01-49e7-832b-d00db63b7032/hDkqQy4Qyj.lottie"
      loop
      autoplay
    /> */}
    {/* <img src="https://lottie.host/37c7a886-ee01-49e7-832b-d00db63b7032/hDkqQy4Qyj.lottie" alt="No Events" className="w-20 h-20 mb-4 opacity-70" /> */}
    <div className="mb-10">
      <CalendarOff className="text-gray-600" size={150} />
    </div>
    <h2 className="text-3xl font-bold text-gray-600">
      {past ? "No Past Events" : "No Upcoming Events"}
    </h2>
    <p className="font-semibold text-gray-500 mt-1">
      {past
        ? "You haven't hosted or attended any past events."
        : "You have no upcoming events. Why not host one?"}
    </p>
    <div className="mt-3">
      <Link
        to="/create/event"
        className="flex gap-2 rounded px-3 py-2 bg-white/20 backdrop-blur-mdshadow-md hover:bg-white/30 transition-colors duration-300"
      >
        <Plus />
        Create Event
      </Link>
    </div>
  </div>
);

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(null);
  const [showModal, setShowModal] = useState(false);
  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  const formatDate = (date) =>
    `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
  const { user } = useAuth();
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setTimeout(() => setShowModal(true), 10);
  };

  const closeEventModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedEvent(null);
    }, 300);
  };

  useEffect(() => {
    if (selectedEvent) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
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
          activeTab === "upcoming" ? setUpcomingEvents([]) : setPastEvents([]);
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

  const handleJoinevent = async (eventId: string) => {
    // console.log(user._id.$oid)
    if (!user) {
      alert("please log in to join the event.");
      return;
    }

    const result = await joinEvent(eventId, {
      user_id: user._id.$oid,
      email: user.email,
      name: user.name,
    });
    console.log(result);
    if (result) {
      alert(result);
    }
  };

  return (
    <div>
      <Header />
      <main className="flex-1 pt-16 pb-16">
        <div className="container">
          <div className="">
            {/* Header Section with Responsive Layout */}
            <div className="flex">
              <div
                className="h-[12rem] w-full absolute left-0 top-0"
                style={{
                  background:
                    "linear-gradient(to bottom, #374151, #1f2937, #050a12)",
                }}
              ></div>
              <div className="w-3/5 mx-auto z-30">
                <div className=" col-md-12 justify-between">
                  <div className="col-md-12 ">
                    <div className="row">
                      <div className="flex mt-10 items-center justify-between flex-wrap gap-4 w-full">
                        {/* Heading */}
                        <h1 className="text-4xl font-bold">Events</h1>
                        <div
                          className="relative flex w-48 rounded-sm p-1 overflow-hidden"
                          style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(12px)",
                            // border: "1px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <motion.div
                            layout
                            initial={false}
                            animate={{
                              x: activeTab === "past" ? "100%" : "0%",
                              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                              backdropFilter: "blur(15px)",
                              background: "rgba(255, 255, 255, 0.4)",
                              // border: "1px solid rgba(255, 255, 255, 0.4)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                            className="absolute top-0 left-0 w-1/2 h-full rounded-sm z-0"
                          />
                          <button
                            onClick={() => setActiveTab("upcoming")}
                            className={`z-10 w-1/2 text-sm py-1 font-semibold transition-colors duration-300 ${
                              activeTab === "upcoming"
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          >
                            Upcoming
                          </button>
                          <button
                            onClick={() => setActiveTab("past")}
                            className={`z-10 w-1/2 text-sm font-semibold py-1 transition-colors duration-300 ${
                              activeTab === "past"
                                ? "text-white"
                                : "text-gray-500 hover:text-white"
                            }`}
                          >
                            Past
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 py-10">
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
                                <>
                                  {[...Array(3)].map((_, index) => (
                                    <TimelineEventSkeleton key={index} />
                                  ))}
                                </>
                              ) : upcomingEvents.length === 0 ? (
                                <NoEvents past={false} />
                              ) : (
                                upcomingEvents.map((event) => (
                                  <TimelineEvent
                                    key={event.id}
                                    event={event}
                                    onClick={() => openEventModal(event)}
                                  />
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
                                <p className="text-gray-500">
                                  Loading past events...
                                </p>
                              ) : pastEvents.length === 0 ? (
                                <NoEvents past />
                              ) : (
                                pastEvents.map((event) => (
                                  <TimelineEvent
                                    key={event.id}
                                    event={event}
                                    onClick={() => openEventModal(event)}
                                  />
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
              showModal ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 sm:p-6 overflow-y-auto h-full">
              {/* Top-right buttons */}
              <div className="flex justify-between items-center space-x-3 mb-2">
                <button
                  onClick={() =>
                    window.open(`/event/${selectedEvent.id}`, "_blank")
                  }
                  className="ps-3  py-1 rounded-md text-sm font-medium
             bg-gray-200 text-gray-700 hover:bg-gray-300 
             dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
             transition duration-200 flex items-center gap-2"
                >
                  Event Page
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-6 sm:w-12 sm:h-8 md:w-14 md:h-10 lg:w-16 lg:h-12"
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

                <button
                  onClick={closeEventModal}
                  className="text-2xl leading-none text-gray-500 hover:text-gray-800
                 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  &times;
                </button>
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

              <p className="font-medium mb-1">
                <strong>Hosted by: Sui on campus</strong>
              </p>

              <div className="flex items-start text-sm text-gray-700 dark:text-gray-300 mb-4 space-x-6">
                {/* Date/Time */}
                <div className="flex items-center">
                  <Calendar className="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 dark:text-gray-300" />
                  <p className="text-sm sm:text-base md:text-lg">
                    Start:{" "}
                    {`${formatDate(selectedEvent.start_time)} ${formatTime(
                      selectedEvent.start_time
                    )}`}
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

              {selectedEvent.attendees.some((attendee) => {
                const userId = user._id?.$oid?.toString(); // safely get user ID

                return attendee.user_id.$oid !== user._id.$oid.toString();
              }) && (
                <button
                  className="
    w-full
    mb-2
    px-4 py-2 rounded-md font-semibold
    bg-gray-200 text-gray-700 hover:bg-gray-300 
    dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
    transition duration-200
  "
                  onClick={() => handleJoinevent(selectedEvent.id)}
                >
                  One Click Apply
                </button>
              )}

              <h3 className="font-medium mb-2">About Event</h3>
              <p className="mb-4">{selectedEvent.description}</p>

              <p
                className="font-medium mb-1"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <User size={20} />
                {selectedEvent.attendees.length}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Floating Add Event Button */}

      {user?.admin && (
        <a
          href="/create/event"
          onClick={() => setShowAddEventModal(true)} // Replace this with your actual add event logic
          className="fixed bottom-8 right-8 z-50  hover:bg-blue-200 
             dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 
             transition duration-200 p-4 rounded-full shadow-lg"
          title="Add Event"
        >
          <FaCalendarAlt className="w-6 h-6" />
        </a>
      )}
      <Footer />
    </div>
  );
};

export default Events;
