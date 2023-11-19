// components/Event.js

import React from 'react';

const Event = ({ events, handleEdit, handleDelete }) => {
  return (
    <div style={styles.container}>
      <h3>Club Events</h3>
      {events.map((event) => (
        <div key={event.eventid} className="event-container" style={styles.eventContainer}>
          <div className="event-details" style={styles.eventDetails}>
            <h2>{event.eventname}</h2>
            <p>{event.description}</p>
            <a href={event.registrationlink} target="_blank" rel="noopener noreferrer">
              Registration Link
            </a>
          </div>
          <div className="event-image" style={styles.eventImage}>
            {event.banner && (
              <img
                src={`data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(event.banner.data)))}`}
                alt={`Event ${event.eventid}`}
              />
            )}
          </div>
          <div style={styles.buttonContainer}>
            <button onClick={() => handleEdit(event)} style={styles.button}>
              Edit
            </button>
            <button onClick={() => handleDelete(event.eventid)} style={styles.button}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
  },
  eventContainer: {
    display: 'inline-block',
    textAlign: 'left',
    border: '1px solid #ccc',
    borderRadius: '8px',
    margin: '10px',
    padding: '10px',
    width: '300px',
  },
  eventDetails: {
    marginBottom: '10px',
  },
  eventImage: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '10px',
  },
  button: {
    marginRight: '5px',
  },
};

export default Event;
