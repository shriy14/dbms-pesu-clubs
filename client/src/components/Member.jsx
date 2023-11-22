import React from 'react';

const Member = ({ members, handleDelete}) => {
  return (
    <div>
      <h3 style={{ marginTop: '15px', textAlign: 'center' }}>Club Members</h3>
      <div className="member-container" style={styles.memberContainer}>
        {members.map((member) => (
          <div key={member.SRN} style={styles.memberCard}>
            <div>
              <strong>Name:</strong> {member.name}
            </div>
            <div>
              <strong>SRN:</strong> {member.SRN}
            </div>
            <div>
              <strong>Email ID:</strong> {member.email}
            </div>
            <div>
              <strong>Phone No.:</strong> {member.phoneno}
            </div>
            <div>
              <strong>Semester:</strong> {member.sem}
            </div>
            <div>
              <strong>Department:</strong> {member.dept}
            </div>
            <div>
              <strong>Gender:</strong> {member.gender}
            </div>
            <button style={styles.removeBtn} onClick={() => handleDelete(member.SRN)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  memberContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '15px',
  },
  memberCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
    width: '300px',
  },
  removeBtn: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Member;
