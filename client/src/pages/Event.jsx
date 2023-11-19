// AddEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import ImageUploadForm from '../components/Image';
import { useParams } from 'react-router-dom';


const AddEvent = () => {
  const { clubname } = useParams();
  const [eventDetails, setEventDetails] = useState({
    clubname: clubname,
    eventname: '',
    date: '',
    description: '',
    loc: '',
    type: '',
    timestamp: '',
    budget: '',
    registrationlink: '',
    banner: null,
  });

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

      const res = await axios.post('http://localhost:8800/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);
      // Handle successful event creation, e.g., show a success message or redirect
    } catch (err) {
      console.error(err);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="add-event-container">
      <h2 className="add-event-heading">Add Event for {clubname}</h2>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="eventname" onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" onChange={handleChange} />
        </label>
        <label>
          Location:
          <input type="text" name="loc" onChange={handleChange} />
        </label>
        <label>
          Type:
          <input type="text" name="type" onChange={handleChange} />
        </label>
        <label>
          Timestamp:
          <input type="datetime-local" name="timestamp" onChange={handleChange} />
        </label>
        <label>
          Budget:
          <input type="text" name="budget" onChange={handleChange} />
        </label>
        <label>
          Registration Link:
          <input type="text" name="registrationlink" onChange={handleChange} />
        </label>
        <label>
          Banner:
          <ImageUploadForm />
        </label>

        <button type="submit" className="add-event-btn">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
