import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ClubMember = () => {
  const { srn } = useParams();
  const navigate = useNavigate();

  const [memberDetails, setMemberDetails] = useState(null);
  const [newClub, setNewClub] = useState({
    clubname: '',
    domainname: '',
  });
  const [clubEvents, setClubEvents] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8800/api/member/${srn}`);
        if (response.ok && isMounted) {
          const data = await response.json();
          setMemberDetails(data);

          if (data && data.clubs.length > 0 && isMounted) {
            const clubEventsPromises = data.clubs.map(async (clubname) => {
              const eventsResponse = await fetch(`/events/${clubname}`);
              if (eventsResponse.ok) {
                return eventsResponse.json();
              } else {
                console.error(`Failed to fetch events for club ${clubname}`);
                return [];
              }
            });

            const clubEventsData = await Promise.all(clubEventsPromises);
    
            const allEvents = clubEventsData.flat();

            setClubEvents(allEvents);
          }
        } else {
          console.error('Failed to fetch member details');
        }
      } catch (error) {
        console.error('Error fetching member details: ', error);
      }
    };

    fetchMemberDetails();

    return () => {
      isMounted = false;
    };
  }, [srn]);

  const handleClubFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/member/${srn}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clubname: newClub.clubname }),
      });

      if (response.ok) {
        console.log('Club added successfully!');
        alert('Club added successfully!');
      } else {
        console.error('Failed to add club');
        alert('Failed to add club');
      }
    } catch (error) {
      console.error('Error adding club: ', error);
      alert('Error adding club');
    }
  };

  const handleClubFormChange = (e) => {
    setNewClub({ ...newClub, [e.target.name]: e.target.value });
  };

  const handleVolunteerClick = async (eventname) => {
    try {
      const response = await fetch(`/volunteer/member/${srn}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ SRN: srn, eventname: eventname }),
      });

      if (response.ok) {
        console.log('Volunteer added successfully!');
        alert('Volunteer added successfully!');
      } else {
        console.error('Failed to add volunteer');
        alert('Failed to add volunteer');
      }
    } catch (error) {
      console.error('Error adding volunteer: ', error);
      alert('Error adding volunteer');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (!memberDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="club-member-dashboard">
      <div className="header">
        <h1 style={{ color: '#3ec1d3' }}>Hi, {memberDetails.name}!</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="club-list">
        <h3>Your Clubs:</h3>
        <div className="highlighted-clubs">
          {memberDetails.clubs.map((club, index) => (
            <span key={index} className="club-highlight">
              {club}
            </span>
          ))}
        </div>
        <h3>Add Club:</h3>
        <form className="club-add-form" onSubmit={handleClubFormSubmit}>
          <div className="form-row">
            <select
              name="domainname"
              value={newClub.domainname}
              onChange={handleClubFormChange}
            >
              <option value="">Select Domain</option>
              <option value="Design">Design</option>
              <option value="Logistics">Logistics</option>
              <option value="Tech">Tech</option>
              <option value="Operations">Operations</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Content Creation">Content Creation</option>
              <option value="Social Media">Social Media</option>
            </select>
            <input
              type="text"
              placeholder="Club Name"
              name="clubname"
              value={newClub.clubname}
              onChange={handleClubFormChange}
            />
            <button type="submit" className="add-club-btn">
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="upcoming-events-member">
        <h3 style={{ marginBottom: `18px` }}>Upcoming Events:</h3>
        {clubEvents.map((event) => (
          <div key={event.eventname} className="event-container-member">
            <h4 style={{ color: '#3ec1d3' }}>{event.eventname}</h4>
            <p>{event.description}</p>
            <p>Location: {event.loc}</p>
            <p>Type: {event.type}</p>
            <p>Timestamp: {event.timestamp}</p>
            <p>Budget: {event.budget}</p>
            <a
              href={event.registrationlink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Registration Link
            </a>
            <button
              onClick={() => handleVolunteerClick(event.eventname)}
              className="volunteer-btn"
            >
              Volunteer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubMember;
