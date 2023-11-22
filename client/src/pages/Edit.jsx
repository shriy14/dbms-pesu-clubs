import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {
  const { clubname } = useParams();
  const {eventname} = useParams();
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState({
    eventname: '',
    description: '',
    loc: '',
    type: '',
    timestamp: '',
    budget: '',
    registrationlink: '',
    banner: null, // Include banner in the state
  });
  console.log(eventDetails);
  const handleChange = (e) => {
    
    const { name, value, type, files } = e.target;
    
    setEventDetails((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in eventDetails) {
        formData.append(key, eventDetails[key]);
      }

      // Make the API request to add the event
      const res = await axios.post(`/events/${clubname}/${eventname}/event/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);

      // Handle success, e.g., show a success message or redirect
      navigate('/');
    } catch (err) {
      console.error(err);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="add-event-container">
      <div className="auth">
        <h1>Update {eventname}</h1>
        <form encType="multipart/form-data">
          <input type="text" placeholder="Event Name" name="eventname" onChange={handleChange} />
          <textarea placeholder="Description" name="description" onChange={handleChange} />
          <input type="text" placeholder="Location" name="loc" onChange={handleChange} />
          <input type="text" placeholder="Type" name="type" onChange={handleChange} />
          <input type="datetime-local" placeholder="Timestamp" name="timestamp" onChange={handleChange} />
          <input type="text" placeholder="Budget" name="budget" onChange={handleChange} />
          <input type="text" placeholder="Registration Link" name="registrationlink" onChange={handleChange} />
          <input type="file" name="banner" onChange={handleChange} accept="image/*" />
          <button onClick={handleSubmit}>Edit Event</button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
