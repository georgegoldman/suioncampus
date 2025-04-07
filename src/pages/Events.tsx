/* eslint-disable @typescript-eslint/no-unused-expressions */
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/api";

type Event = {
  id: string,
  title: string,
  date: string,
  location: string
}

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(
          activeTab === "upcoming" ? "/api/v1/events/upcoming" : "/api/v1/events/past"
        );
        activeTab === "upcoming"
        ? setUpcomingEvents(res.data || [])
        : setPastEvents(res.data || []);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("No events found");
        } else {
          setError(err.response?.data?.message || "Failed to fetch events");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [activeTab])

  return (
    <div>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-5 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="col-3"></div>

            <div className="col-6 relative">
              <div className="absolute top-0 start-0">
                <div className="text-xl font-bold">Events</div>
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
                    className={`z-10 w-1/2 text-sm py-2 rounded-full transition-colors duration-300 ${
                      activeTab === "upcoming" ? "text-black font-semibold" : "text-gray-500"
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`z-10 w-1/2 text-sm py-2 rounded-full transition-colors duration-300 ${
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
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && (
                    <ul className="list-disc list-inside">
                      {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event) => (
                          <li key={event.id}>
                            <span className="font-medium">{event.title}</span> –{" "}
                            <span className="text-sm text-gray-500">{event.date}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No upcoming events.</li>
                      )}
                    </ul>
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
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && (
                    <ul className="list-disc list-inside">
                      {pastEvents.length > 0 ? (
                        pastEvents.map((event) => (
                          <li key={event.id}>
                            <span className="font-medium">{event.title}</span> –{" "}
                            <span className="text-sm text-gray-500">{event.date}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No past events.</li>
                      )}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
                </div>
            </div>

            <div className="col-3"></div>


          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
