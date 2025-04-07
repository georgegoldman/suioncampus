import api from "@/api";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const EventList = ({ registeredEventIds }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (registeredEventIds.length === 0) {
            setLoading(false);
            return;
        }

        const x = registeredEventIds.map(event => event.$oid );
        console.log(x);

        api.post(`/events/multiple`, x)
        .then(({data}) => {
            setEvents(data);
            setLoading(false)
        })
        .catch(()=> setLoading(false));
    }, [registeredEventIds]);

    if (loading) return <p>Loading</p>;

    return (
        <div>
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event._id}>
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                    </div>
                ))
            ) : (
                <p className="text-muted-foreground">You haven't registered for any events yet.</p>
            )}
        </div>
    );
}


export default EventList;