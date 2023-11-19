import React from 'react';

const Member = ({ members }) => {
  return (
    <div>
      <h3>Club Members</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>SRN</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Domain</th>
            <th style={styles.tableHeader}>Email ID</th>
            <th style={styles.tableHeader}>Phone No.</th>
            <th style={styles.tableHeader}>Semester</th>
            <th style={styles.tableHeader}>Department</th>
            <th style={styles.tableHeader}>Gender</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.SRN}>
              <td style={styles.tableCell}>{member.SRN}</td>
              <td style={styles.tableCell}>{member.name}</td>
              <td style={styles.tableCell}>{member.domain}</td>
              <td style={styles.tableCell}>{member.email}</td>
              <td style={styles.tableCell}>{member.phoneno}</td>
              <td style={styles.tableCell}>{member.sem}</td>
              <td style={styles.tableCell}>{member.dept}</td>
              <td style={styles.tableCell}>{member.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    background: '#007bff',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
  },
};

export default Member;
