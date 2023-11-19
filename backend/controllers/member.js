import { db } from '../db.js';

export const getMemberDetails = (req, res) => {
  const { srn } = req.params;

  const getMemberDetailsQuery = "SELECT * FROM Member WHERE SRN = ?";

  db.query(getMemberDetailsQuery, [srn], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      const memberDetails = {
        SRN: data[0].SRN,
        name: data[0].name,
        email: data[0].email,
        clubs: data.map(item => item.clubname),
      };

      return res.status(200).json(memberDetails);
    } else {
      return res.status(404).json("Member not found!");
    }
  });
};

export const getAllMembersInClub = (req, res) => {
  const { clubname } = req.params;

  const getAllMembersQuery = "SELECT * FROM Member WHERE clubname = ?";

  db.query(getAllMembersQuery, [clubname], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      const clubMembers = data.map((member) => ({
        SRN: member.SRN,
        name: member.name,
        email: member.email,
        domainname: member.domainname, // Add domainname to the mapping
        phoneno: member.phoneno,       // Add phoneno to the mapping
        sem: member.sem,               
        dept: member.dept,           
        gender: member.gender,         
      }));

      return res.status(200).json(clubMembers);
    } else {
      return res.status(404).json("No members found for the club");
    }
  });
};

export const getMemberCountInClub = (req, res) => {
  const { clubname } = req.params;

  const getMemberCountQuery = "SELECT COUNT(*) AS memberCount FROM Member WHERE clubname = ?";

  db.query(getMemberCountQuery, [clubname], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      const memberCount = data[0].memberCount;
      return res.status(200).json({ memberCount });
    } else {
      return res.status(404).json("No members found for the club");
    }
  });
};