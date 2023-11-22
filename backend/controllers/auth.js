import { db } from "../db.js";

export const register = (req, res) => {
  const { email, password, userType, clubName, facultyId, headSrn, srn, name, clubType, domain, sem, dept, phoneno, gender } = req.body;

  const checkUserQuery = "SELECT * FROM Member WHERE email = ?";
  db.query(checkUserQuery, [email], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (data.length) {
      return res.status(409).json({ error: "User already exists" });
    }

    if (userType === 'club') {
      const insertClubQuery = "INSERT INTO Club (`clubname`, `facultyid`, `headSRN`, `type`) VALUES (?, ?, ?, ?)";
      const valuesClub = [clubName, facultyId, headSrn, clubType];

      const insertMemberQuery = "INSERT INTO Member (`SRN`, `name`, `email`, `password`, `sem`, `dept`, `phoneno`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const valuesMember = [headSrn, name, email, password, sem, dept, phoneno, gender];

      db.query(insertMemberQuery, valuesMember, (err, data) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.query(insertClubQuery, valuesClub, (err, data) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const insertClubMemberQuery = "INSERT INTO ClubMember (`SRN`, `clubname`) VALUES (?, ?)";
          const valuesClubMember = [headSrn, clubName];

          db.query(insertClubMemberQuery, valuesClubMember, (err, data) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            return res.status(200).json({ message: "Club has been created" });
          });
        });
      });
    } else if (userType === 'member') {
      const checkDomainQuery = "SELECT domainid FROM Domain WHERE LOWER(domainname) = LOWER(?)";

      db.query(checkDomainQuery, [domain], (err, domainData) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (domainData.length === 0) {
          return res.status(404).json({ error: "Domain not found" });
        }

        const domainId = domainData[0].domainid;

        const insertMemberQuery = "INSERT INTO Member (`SRN`, `name`, `email`, `password`, `sem`, `dept`, `phoneno`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const valuesMember = [srn, name, email, password, sem, dept, phoneno, gender];

        db.query(insertMemberQuery, valuesMember, (err, data) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const insertMemberDomainQuery = "INSERT INTO ClubDomain (`domainid`, `SRN`, `clubname`) VALUES (?, ?, ?)";
          const valuesMemberDomain = [domainId, srn, clubName];

          db.query(insertMemberDomainQuery, valuesMemberDomain, (err, data) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            const insertClubMemberQuery = "INSERT INTO ClubMember (`SRN`, `clubname`) VALUES (?, ?)";
            const valuesClubMember = [srn, clubName];

            db.query(insertClubMemberQuery, valuesClubMember, (err, data) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              return res.status(200).json({ message: "User has been created" });
            });
          });
        });
      });
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }
  });
};
 

export const login = (req, res) => {
  const { srn, password, userType, clubName } = req.body;

  if (userType === 'clubHead') {
    const checkClubHeadQuery = `
      SELECT M.password as clubPassword, C.*
      FROM Member M
      JOIN Club C ON M.SRN = C.headSRN
      WHERE C.clubname = ?`;

    db.query(checkClubHeadQuery, [clubName], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (data.length) {
        const storedPassword = data[0].clubPassword;

        if (password === storedPassword) {
          return res.status(200).json({
            message: "Club Head Logged in!",
            userType: 'clubHead',
            clubName: data[0].clubName,
          });
        } else {
          return res.status(400).json("Wrong Club Name/Password!");
        }
      } else {
        return res.status(404).json("Club not found or wrong Club Name/Password!");
      }
    });

  } else if (userType === 'member') {
   
    const checkMemberQuery = "SELECT * FROM Member WHERE SRN = ?";
    db.query(checkMemberQuery, [srn], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (data.length) {
        const storedPassword = data[0].password;

        if (password === storedPassword) {
          return res.status(200).json({
            message: "Member Logged in!",
            userType: 'member',
            SRN: data[0].SRN,
          });
        } else {
          return res.status(400).json("Wrong SRN/Password!");
        }
      } else {
        return res.status(404).json("Member not found or wrong SRN/Password!");
      }
    });
  } else {
    return res.status(400).json("Invalid user type");
  }
};