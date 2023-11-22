import React, { useState, useEffect } from 'react';
// import Members from '../components/Member';
import Events from '../components/Event';
import Members from '../components/Member'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import axios from "axios"

const ClubAdmin = () => {
  const { clubname } = useParams();
  const [clubDetails, setClubDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [clubMembers, setClubMembers] = useState([]);
  const [clubEvents, setClubEvents] = useState([]);
  const [memberCount, setMemberCount] = useState(null);
  const [totalBudget, setTotalBudget] = useState(null); // New state for member count
  const navigate = useNavigate();
    console.log(clubEvents)
    const handleDelete = async (eventname) => {
      
      try {
        const response = await fetch(`/events/delete/${eventname}`, {
          method: 'DELETE',
        });
    
        const data = await response.json();
    
        // If the delete operation is successful, update the state to reflect the changes
        if (response.ok) {
          setClubEvents((prevEvents) =>
            prevEvents.filter((event) => event.eventname !== eventname)
          );
          console.log('Event deleted successfully');
          alert('Event deleted successfully')
        } else {
          console.error('Failed to delete event:', data);
        }
      } catch (err) {
        console.error('Error deleting event: ', err);
      }
    };
  
  const handleEditEvent = (eventname) => {
    // Redirect to the edit event page
    navigate(`/${clubname}/${eventname}/event/edit`);
  };
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

    const fetchMemberCount = async () => {
      try {
        const response = await fetch(`/member/admin/count/${clubname}`);
        if (response.ok) {
          const data = await response.json();
          setMemberCount(data.memberCount);
        } else {
          console.error('Failed to fetch member count');
        }
      } catch (error) {
        console.error('Error fetching club details: ', error);
      }
    };

    const fetchTotalBudget = async () => {
      try {
        const response = await fetch(`/member/admin/budget/${clubname}`);
        if (response.ok) {
          const data = await response.json();
          setTotalBudget(data.totalBudget);
        } else {
          console.error('Failed to fetch member count');
        }
      } catch (error) {
        console.error('Error fetching club details: ', error);
      }
    };

    const fetchClubMembers = async () => {
      try {
        const response = await fetch(`/member/admin/allmembers/${clubname}`);
        if (response.ok) {
          const data = await response.json();
          setClubMembers(data);
        } else {
          console.error('Failed to fetch club members');
        }
      } catch (error) {
        console.error('Error fetching club details: ', error);
      }
    };

    fetchClubDetails();
    fetchMemberCount(); // Fetch member count
    fetchClubMembers();
    fetchClubEvents();
    fetchTotalBudget();
    
  }, [clubname]);

  if (!clubDetails) {
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
            
            <p style={{textAlign:'center',marginTop:'10px'}}>Member Count: {memberCount}</p>
           
            <Members members={clubMembers} />
          </div>
        );
      case 'events':
       
        return clubEvents ? <Events budget = {totalBudget} clubname = {clubname} events={clubEvents} handleDelete={handleDelete} handleEdit={handleEditEvent}/> : null;
      default:
        return null;
    }
  };
  return (
    <div className="club-member-dashboard">
      <div className="header">
        <h1 style={{ color: '#3ec1d3' }}>Hi, {clubDetails.clubname} Admin!</h1>
        <button className="logout-btn" onClick={() => navigate('/')}>
          Logout
        </button>
      </div>
      <div className="club-list">
        <h3>Club Details:</h3>
        <p>Type: {clubDetails.type}</p>
        <p>Faculty ID: {clubDetails.facultyid}</p>
        <p>Head SRN: {clubDetails.headSRN}</p>

        {/* Navigation Menu */}
        <nav style={{ marginTop: '18px' }}>
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
        <div className="upcoming-events-member">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default ClubAdmin;
