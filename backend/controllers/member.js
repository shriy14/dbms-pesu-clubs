import { db } from '../db.js';

export const getMemberDetails = (req, res) => {
  const { srn } = req.params;
  const getMemberDetailsQuery = "SELECT * FROM Member WHERE SRN = ?";

  db.query(getMemberDetailsQuery, [srn], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      // Extract member details
      const memberDetails = {
        SRN: data[0].SRN,
        name: data[0].name,
        email: data[0].email,
      };

      // Query to get clubs that the member is part of from the ClubMember table
      const getClubsQuery = "SELECT clubname FROM ClubMember WHERE SRN = ?";

      db.query(getClubsQuery, [srn], (err, clubData) => {
        if (err) {
          return res.status(500).json(err);
        }

        // Add the list of clubs to the memberDetails object
        memberDetails.clubs = clubData.map((item) => item.clubname);

        return res.status(200).json(memberDetails);
      });
    } else {
      return res.status(404).json("Member not found!");
    }
  });
};


export const getAllMembersInClub = (req, res) => {
  const { clubname } = req.params;

  const getAllMembersQuery = `SELECT *
  FROM member
  WHERE SRN IN (
      SELECT SRN
      FROM clubmember
      WHERE clubname = ?
  );`;
  

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

  const getMemberCountQuery = `SELECT COUNT(*) AS member_count
  FROM clubmember
  WHERE clubname = ?;`;

  db.query(getMemberCountQuery, [clubname], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log(data)
    if (data.length) {
      const memberCount = data[0].member_count;
      
      return res.status(200).json({ memberCount });
    } else {
      return res.status(404).json("No members found for the club");
    }
  });
};


export const addClubToMember = (req, res) => {
  const { srn } = req.params;
  const { clubname } = req.body;

  const addClubQuery = "INSERT INTO ClubMember (SRN, clubname) VALUES (?, ?)";

  db.query(addClubQuery, [srn, clubname], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json("Club added to member successfully");
  });
};

export const getBudget = (req, res) => {
  const { clubname } = req.params;

  const getBudgetQuery = `SELECT getTotalBudgetForClub(?) AS totalBudget
  FROM event;`;

  db.query(getBudgetQuery, [clubname], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log(data)
    if (data.length) {
      const totalBudget = data[0].totalBudget;
      
      return res.status(200).json({ totalBudget });
    } else {
      return res.status(404).json("No members found for the club");
    }
  });
};
