import React from 'react';
import { Link } from 'react-router-dom';


  const Event = ({ clubname, budget, events, handleEdit, handleDelete }) => {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Club Events</h3>
      
        <p style={{ textAlign: 'center', marginTop: '10px' }}>Total Budget: {budget}</p>
        {events.map((event) => (
          <div key={event.eventid} className="event-container" style={styles.eventContainer}>
            <div className="content" style={styles.content}>
              <div className="event-details" style={styles.eventDetails}>
                <h2 style={styles.eventName}>{event.eventname}</h2>
                <p>{event.description}</p>
                <p>
                  <strong>Budget:</strong> {event.budget}
                </p>
                <p>
                  <strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Location:</strong> {event.loc}
                </p>
                <a href={event.registrationlink} target="_blank" rel="noopener noreferrer">
                  Registration Link
                </a>
              </div>
              <div className="button-container" style={styles.buttonContainer}>
                <button onClick={() => handleEdit(event.eventname)} style={styles.button}>
                  Edit
                </button>
                <button onClick={() => handleDelete(event.eventname)} style={styles.button}>
                  Delete
                </button>
              </div>
            </div>
            <div className="event-image" style={styles.eventImage}>
              {event.banner && (
                <img
                  src={`data:image/jpeg;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(event.banner.data))
                  )}`}
                  alt={`Event ${event.eventid}`}
                />
              )}
            </div>
          </div>
        ))}
        <div style={styles.addEventButtonContainer}>
          <Link to={`/${clubname}/event`} style={styles.addButton}>
            Add Event
          </Link>
        </div>
      </div>
    );
  };

const styles = {
  title: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  container: {
    textAlign: 'center',
  },
  eventContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    border: '1px solid #ccc',
    borderRadius: '8px',
    margin: '10px',
    padding: '10px',
    width: '750px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  eventDetails: {
    marginBottom: '10px',
  },
  eventName: {
    color: '#3ec1d3',
  },
  eventImage: {
    marginTop:`20px`,
    textAlign: 'right',
    
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    marginTop: '10px',
  },
  button: {
    marginRight: '5px',
    backgroundColor: '#64CDDB',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  addEventButtonContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#64CDDB',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'inline-block',
  },
};

export default Event;
