/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/api";
import { format } from "date-fns";

interface MongoDateNumberLong {
  $numberLong: string;
}

interface MongoDate {
  $date: MongoDateNumberLong | number;
}

// Function to format MongoDB dates with proper TypeScript types
function formatMongoDate(dateValue: MongoDate | string | undefined | null): string {
  if (!dateValue) return '';
  
  let timestamp: number;
  
  if (typeof dateValue === 'object' && '$date' in dateValue) {
    // It's a MongoDB date object
    const mongoDate = dateValue.$date;
    
    if (typeof mongoDate === 'object' && '$numberLong' in mongoDate) {
      // Format: { $date: { $numberLong: "1744930800000" } }
      timestamp = parseInt(mongoDate.$numberLong);
    } else if (typeof mongoDate === 'number') {
      // Format: { $date: 1744930800000 }
      timestamp = mongoDate;
    } else {
      return '';
    }
  } else if (typeof dateValue === 'string') {
    // ISO string format
    return format(new Date(dateValue), 'MMM d, yyyy h:mm a');
  } else {
    return '';
  }
  
  return format(new Date(timestamp), 'MMM d, yyyy h:mm a');
}

interface Attendees {
  user_id: {$oid: string},
  name: string,
  email: string
}

export type EventItem = {
  id: string;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  location: string;
  image: string;
  type: 'hackerthon' | 'workshop' | 'meetup';
  registrationLink?: string;
  isPast?: boolean;
  attendees?: [Attendees];
  isPinned?: boolean;

};

// Add this function to your events.ts file:

interface UpdateEventRequest {
  name: string;
  description: string;
  location: string;
  event_type: string;
  start_time: string; // ISO string format
  end_time: string; // ISO string format
  updated_at: string
}

export const updateEvent = async (eventId: string, eventData: UpdateEventRequest): Promise<any> => {
  try {
    console.log(eventData)
    const response = await api.put(`/event/${eventId}`, eventData);
    
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to update event');
  } catch (error) {
    console.error('Error updating event:', error);
    throw error; // Re-throw to allow handling in component
  }
};

export const deleteEvent = async (eventId: string): Promise<any> => {
  try {
    const response = await api.delete(`/event/${eventId}`)
    if (response.status === 200) return response.data;
    throw new Error("Delete Operation failed")
  } catch (error) {
    throw error;
  }
}

export const updateEevntImage = async (eventId: string, eventImageString: string): Promise<any> => {
  try {
    const updated_at = new Date().toISOString();
    const image_url = eventImageString;
    const payload = {
      image_url,
      updated_at,
    }

    const response = await api.put(`/event/image/${eventId}`, payload);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('failed to update event image');

  } catch (error) {
    throw error
  }
}

export const createEvent = async (name: string, location: string, image_url: string, host_id: string, 
  description: string, event_type: string,
  start_time: string,
  end_time: string,
) => {
  try {
    console.log(image_url)
    const newEvent = {name, location, image_url, host_id, description, event_type, start_time, end_time}
    const response = await api.post(`/event`, newEvent)
    if (response.status === 200){
      return response.data
    }
  } catch (error) {
    throw error
  }
}

export const fetchAnEvent = async (eventId: string): Promise<EventItem | null> => {
  try {
    console.log("getting here")
    const response = await api.get(`/event/${eventId}`);
    const data = response.data;
    const event: EventItem = {
      id: data._id.$oid,
      name: data.name,
      description: data.description,
      start_time: new Date(formatMongoDate(data.start_time)),
      end_time: new Date(formatMongoDate(data.end_time)),
      location: data.location,
      image: data.image_url || '', // If no image URL, provide a default or empty string
      type: data.event_type,
      attendees: data.attendees,
      isPast: new Date(data.end_time) > new Date(), // Check if the event is in the past
      isPinned: data.pinned || false, // Default value for pinned
      registrationLink: '', // You can set a registration link here if needed
    }
    return event;
  } catch (error) {
    console.error("Error fetching events:", error);
    return;
  }
}

export const joinEvent = async (eventId: string, user: {user_id:string, name: string, email: string}): Promise<{msg: string} | undefined > => {
  try {
    const response = await api.put(`/event/join/${eventId}`, {
  "user_id": user.user_id,
  "name": user.name,
  "email": user.email
});
    
    if (response.status === 200) return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Function to update pinned status - ensures only one event is pinned at a time
export const updatePinnedStatus = async (eventId: string, newPinnedStatus: boolean): Promise<EventItem[]> => {
  try {
    const response = await api.put(`/event/pin/${eventId}`, {
      "pin": newPinnedStatus 
    }); // Await the events data
    
    if (response.status === 200) return response.data;
  } catch (error) {
    console.error("Error updating pinned status:", error);
    throw error; // Re-throw to allow handling in the component
  }
};

export const fetchPinnedEvents = async (): Promise<EventItem | null> => {
  try {
    const response = await api.get('/pinned_event');
    const data = response.data;
    // map the api to the structure
    // console.log(data.start_time)
    const event: EventItem = {
      id: data._id.$oid,
      name: data.name,
      description: data.description,
      start_time: new Date(formatMongoDate(data.start_time)),
      end_time: new Date(formatMongoDate(data.end_time)),
      location: data.location,
      image: data.image_url || '', // If no image URL, provide a default or empty string
      type: data.event_type,
      attendees: data.attendees,
      isPast: new Date(data.end_time) > new Date(), // Check if the event is in the past
      isPinned: data.pinned || false, // Default value for pinned
      registrationLink: '', // You can set a registration link here if needed
    };
    return event;
  } catch (error) {
    console.error('Error fetching events:', error);
    return;
  }
}

export const fetchUpcomingOrPastEvents = async (activeTab: string): Promise<EventItem[] | null> => {
  try {

    const response = await api.get(
      activeTab == "upcoming" ? "/events/upcoming" : "/events/past"
    );
    
    const data = response.data;
    // map the api to the structure
    console.log(data.start_time)
    const events = data.map((event) => ({
      id: event._id.$oid,
      name: event.name,
      description: event.description,
      location: event.location,
      image: event.image_url || 'https://res.cloudinary.com/georgegoldman/image/upload/c_thumb,w_200,g_face/v1747747289/suioncampus/SOC_LOGO_czms9t.jpg', // If no image URL, provide a default or empty string
      type: event.event_type,
      start_time: new Date(formatMongoDate(event.end_time)),
      end_time: new Date(formatMongoDate(event.end_time)),
      isPast: new Date(event.end_time) > new Date(), // Check if the event is in the past
      isPinned: event.pinned || false, // Default value for pinned
      attendees: event.attendees,
      registrationLink: '', // You can set a registration link here if needed
    }));
    return events
  } catch (error) {
    console.error('Error fetching event:', error);
    return;
  }
}


export const fetchEvents = async (): Promise<EventItem[]>  => {
  try {
    const response = await api.get('/events');
    const data = response.data;
    

    // Map the API response to the structure 
    const events = data.map((event) => ({
      id: event._id.$oid,
      name: event.name,
      description: event.description,
      location: event.location,
      image: event.image_url || '', // If no image URL, provide a default or empty string
      type: event.event_type,
      start_time: new Date(formatMongoDate(event.end_time)),
      end_time: new Date(formatMongoDate(event.end_time)),
      isPast: new Date(event.end_time) > new Date(), // Check if the event is in the past
      isPinned: event.pinned || false, // Default value for pinned
      attendees: event.attendees,
      registrationLink: '', // You can set a registration link here if needed
    }));

    

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return []; // Return an empty array in case of an error
  }
}