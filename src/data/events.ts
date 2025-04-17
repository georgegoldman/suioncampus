
import api from "@/api";

export type EventItem = {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  type: 'hackerthon' | 'workshop' | 'meetup';
  registrationLink?: string;
  isPast?: boolean;
  isPinned?: boolean;
};



export const fetchEvents = async (): Promise<EventItem[]>  => {
  try {
    const response = await api.get('/events');
    const data = response.data;
    

    // Map the API response to the structure your app expects
    const events = data.map((event) => ({
      id: event._id.$oid,
      name: event.name,
      description: event.description,
      date: `${new Date(event.start_time).toLocaleDateString()} - ${new Date(event.end_time).toLocaleDateString()}`,
      location: event.location,
      image: event.image_url || '', // If no image URL, provide a default or empty string
      type: event.event_type,
      start_time: event.start_time,
      end_time: event.end_time,
      isPast: new Date(event.start_time) < new Date(), // Check if the event is in the past
      isPinned: event.pinned || false, // Default value for pinned
      registrationLink: '', // You can set a registration link here if needed
    }));

    

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return []; // Return an empty array in case of an error
  }
}

// Function to update pinned status - ensures only one event is pinned at a time
export const updatePinnedStatus = async (eventId: string): Promise<EventItem[]> => {
  const theEvents = await fetchEvents(); // Await the events data
  return theEvents.map(event => ({
    ...event,
    isPinned: event.id === eventId
  }));
};