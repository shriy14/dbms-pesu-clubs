import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events'); // Assuming your API endpoint is /api/events
        console.log(res.data);
        setEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home">
      <h1 className="welcome-message">Welcome to the Clubs Page of PESU!</h1>
      <h2 className="upcoming-events">Upcoming Events</h2>

      {events.map((event) => (
        <div key={event.eventid} className="event-container">
          <div className="event-details">
            <h2>{event.eventname}</h2>
            <p>{event.description}</p>
            <a href={event.registrationlink} target="_blank" rel="noopener noreferrer">
              Registration Link
            </a>
          </div>
          <div className="event-image">
            {event.banner && (
              <img
                src={`data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(event.banner.data)))}`}
                alt={`Event ${event.eventid}`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
