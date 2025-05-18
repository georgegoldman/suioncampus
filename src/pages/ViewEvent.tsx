import Header from "@/components/Header";
import ManageAccessCard from "@/components/ManageAccessCard";
import { MapPin, Tag, Calendar, User, ArrowUpRight } from 'lucide-react';
import { fetchAnEvent, EventItem, joinEvent, updateEvent } from "@/data/events";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AutoGrowingTextarea from "@/components/AutoGrowingTextarea";

const ViewEvent = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_time: '',
        start_time_hours: '',
        start_time_minutes: '',
        end_time: '',
        end_time_hours: '',
        end_time_minutes: '',
        location: '',
        type: 'meetup'
    });
    
    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const formatDate = (date) => `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;

    const openEventModal = (event) => {
        setSelectedEvent(event);
        // Update form data when modal is opened
        setFormData({
            name: event.name || '',
            description: event.description || '',
            location: event.location || '',
            type: event.type || 'meetup',
            start_time: formatDateForInput(event.start_time),
            start_time_hours: getHoursFromDate(event.start_time),
            start_time_minutes: getMinutesFromDate(event.start_time),
            end_time: formatDateForInput(event.end_time),
            end_time_hours: getHoursFromDate(event.end_time),
            end_time_minutes: getMinutesFromDate(event.end_time)
        });
        setTimeout(() => setShowModal(true), 10);
    };

    const closeEventModal = () => {
        setShowModal(false);
        setTimeout(() => {
            setSelectedEvent(null);
        }, 300);
    };
    
    // Helper function to format date for input type="date"
    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // Helper functions to get hours and minutes from Date
    const getHoursFromDate = (date) => {
        if (!date) return '';
        return String(new Date(date).getHours()).padStart(2, '0');
    };
    
    const getMinutesFromDate = (date) => {
        if (!date) return '';
        return String(new Date(date).getMinutes()).padStart(2, '0');
    };
    
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
                
                // Initialize form data after fetching event
                if (fetchedEvent) {
                    setFormData({
                        name: fetchedEvent.name || '',
                        description: fetchedEvent.description || '',
                        location: fetchedEvent.location || '',
                        type: fetchedEvent.type || 'meetup',
                        start_time: formatDateForInput(fetchedEvent.start_time),
                        start_time_hours: getHoursFromDate(fetchedEvent.start_time),
                        start_time_minutes: getMinutesFromDate(fetchedEvent.start_time),
                        end_time: formatDateForInput(fetchedEvent.end_time),
                        end_time_hours: getHoursFromDate(fetchedEvent.end_time),
                        end_time_minutes: getMinutesFromDate(fetchedEvent.end_time)
                    });
                }
            } catch (err) {
                console.error("Error loading event:", err);
            } finally {
                setLoading(false);
            }
        };
        
        loadEvent();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create start and end date objects by combining date and time inputs
        const createDateTimeFromInputs = (dateStr, hoursStr, minutesStr) => {
            if (!dateStr) return null;
            const date = new Date(dateStr);
            const hours = parseInt(hoursStr || '0', 10);
            const minutes = parseInt(minutesStr || '0', 10);
            date.setHours(hours, minutes, 0, 0);
            return date;
        };
        
        const startDateTime = createDateTimeFromInputs(
            formData.start_time,
            formData.start_time_hours,
            formData.start_time_minutes
        );
        
        const endDateTime = createDateTimeFromInputs(
            formData.end_time,
            formData.end_time_hours,
            formData.end_time_minutes
        );
        
        // Update the event state with new form data
        const updatedEvent = {
            ...event,
            name: formData.name,
            description: formData.description,
            location: formData.location,
            type: formData.type,
            start_time: startDateTime || event.start_time,
            end_time: endDateTime || event.end_time
        };
        
        try {
            // Format the data for the API request
            const eventUpdateData = {
                name: updatedEvent.name,
                description: updatedEvent.description,
                location: updatedEvent.location,
                event_type: updatedEvent.type,
                start_time: updatedEvent.start_time.toISOString(),
                end_time: updatedEvent.end_time.toISOString()
            };
            
            // Call the API to update the event
            await updateEvent(eventId, eventUpdateData);
            
            // Update local state after successful API call
            setEvent(updatedEvent);
            console.log('Successfully updated event:', updatedEvent);
            
            closeEventModal();
        } catch (error) {
            console.error('Error updating event:', error);
            // Handle error (e.g., show an error message)
        }
    };
    
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
                                            <button className="w-full border border-gray-50 dark:bg-white dark:text-black font-semibold py-2 rounded-lg hover:bg-zinc-200 transition">
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
                                    className="px-2 py-2 rounded-md text-sm font-medium
                                        bg-gray-200 text-gray-700 hover:bg-gray-300 
                                        dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 
                                        transition duration-200 flex items-center gap-2"
                                >
                                    <i className="fa-solid fa-angles-right"></i>
                                </button>
                                <p className="">Edit Event</p>
                            </div>
                            
                            <div className="pt-5 mb-4 flex justify-start">
                                <form onSubmit={handleSubmit} className="w-full space-y-4">
                                    <div>
                                        <label className="block mb-1 font-medium">Event Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 font-medium">Description</label>
                                        <AutoGrowingTextarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block mb-1 font-medium">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block mb-1 font-medium">Event Type</label>
                                        <select
                                            name="type"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            value={formData.type}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="meetup">Meetup</option>
                                            <option value="workshop">Workshop</option>
                                            <option value="hackerthon">Hackaton</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block mb-1 font-medium">Start Date</label>
                                        <input
                                            type="date"
                                            name="start_time"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            value={formData.start_time}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block mb-1 font-medium">Start Time</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    name="start_time_hours"
                                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                                    placeholder="HH"
                                                    min="0"
                                                    max="23"
                                                    value={formData.start_time_hours}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <span className="flex items-center">:</span>
                                                <input
                                                    type="number"
                                                    name="start_time_minutes"
                                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                                    placeholder="MM"
                                                    min="0"
                                                    max="59"
                                                    value={formData.start_time_minutes}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block mb-1 font-medium">End Date</label>
                                        <input
                                            type="date"
                                            name="end_time"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            value={formData.end_time}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block mb-1 font-medium">End Time</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    name="end_time_hours"
                                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                                    placeholder="HH"
                                                    min="0"
                                                    max="23"
                                                    value={formData.end_time_hours}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <span className="flex items-center">:</span>
                                                <input
                                                    type="number"
                                                    name="end_time_minutes"
                                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                                    placeholder="MM"
                                                    min="0"
                                                    max="59"
                                                    value={formData.end_time_minutes}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Update Event
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewEvent;