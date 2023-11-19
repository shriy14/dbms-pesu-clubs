import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ClubMember = () => {
  const { srn } = useParams();
  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8800/api/member/${srn}`);
        if (response.ok) {
          const data = await response.json();
          setMemberDetails(data);
        } else {
          console.error('Failed to fetch member details');
        }
      } catch (error) {
        console.error('Error fetching member details: ', error);
      }
    };

    fetchMemberDetails();
  }, [srn]);

  if (!memberDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="club-member-dashboard">
      <h2>Hi, {memberDetails.name}!</h2>
      <div className="club-list">
        <h3>Your Clubs:</h3>
        <div className="highlighted-clubs">
          {memberDetails.clubs.map((club, index) => (
            <span key={index} className="club-highlight">
              {club}
            </span>
          ))}
        </div>
        <button className="add-club-btn">Add Club</button>
      </div>

      <div className="upcoming-events">
        <h3>Upcoming Events:</h3>
        
      </div>
    </div>
  );
};

export default ClubMember;
