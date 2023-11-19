// components/ClubAdmin.js

import React, { useState, useEffect } from 'react';
import Members from '../components/Member';
import Events from '../components/Event';
import { useParams } from 'react-router-dom';

const ClubAdmin = () => {
  const { clubname } = useParams();
  const [clubDetails, setClubDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [clubMembers, setClubMembers] = useState([]);
  const [clubEvents, setClubEvents] = useState([]);
  const [memberCount, setMemberCount] = useState(null); // New state for member count

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(`/admin/${clubname}`);
        if (response.ok) {
          const data = await response.json();
          setClubDetails(data);
        } else {
          console.error('Failed to fetch club details');
        }
      } catch (error) {
        console.error('Error fetching club details: ', error);
      }
    };

    const fetchMemberCount = async () => {
      try {
        const response = await fetch(`/member/admin/${clubname}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setMemberCount(data.memberCount);
        } else {
          console.error('Failed to fetch member count');
        }
      } catch (error) {
        console.error('Error fetching member count: ', error);
      }
    };

    const fetchClubMembers = async () => {
      try {
        const response = await fetch(`/member/admin/${clubname}`);
        if (response.ok) {
          const data = await response.json();
          setClubMembers(data);
        } else {
          console.error('Failed to fetch club members');
        }
      } catch (error) {
        console.error('Error fetching club members: ', error);
      }
    };

    const fetchClubEvents = async () => {
      try {
        const response = await fetch(`/events/${clubname}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setClubEvents(data);
        } else {
          console.error('Failed to fetch club events');
        }
      } catch (error) {
        console.error('Error fetching club events: ', error);
      }
    };

    fetchClubDetails();
    fetchMemberCount(); // Fetch member count
    fetchClubMembers();
    fetchClubEvents();
  }, [clubname]);

  if (!clubDetails || memberCount === null) {
    return <div>Loading...</div>;
  }

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'members':
        return (
          <div>
            
            <p>Member Count: {memberCount}</p>
            <Members members={clubMembers} />
          </div>
        );
      case 'events':
        return clubEvents ? <Events events={clubEvents} /> : null;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2>Club Admin Page</h2>
      <h3>Club Name: {clubDetails.clubname}</h3>
      <p>Type: {clubDetails.type}</p>
      <p>Faculty ID: {clubDetails.facultyid}</p>
      <p>Head SRN: {clubDetails.headid}</p>

      {/* Navigation Menu */}
      <nav>
        <label htmlFor="options">Select an option:</label>
        <select
          id="options"
          value={selectedOption}
          onChange={(e) => handleOptionChange(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="members">Members</option>
          <option value="events">Events</option>
        </select>
      </nav>

      {/* Render the selected component */}
      <div style={styles.componentContainer}>{renderComponent()}</div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  componentContainer: {
    marginTop: '20px',
  },
};

export default ClubAdmin;
