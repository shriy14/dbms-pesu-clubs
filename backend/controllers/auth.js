import { db } from "../db.js";

export const register = (req, res) => {
  const { email, password, userType, clubName, facultyId, headSrn, srn, name, clubType, domain, sem, dept, phoneno, gender } = req.body;

  const checkUserQuery = "SELECT * FROM Member WHERE email = ?";
  db.query(checkUserQuery, [email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      return res.status(409).json("User already exists");
    }

    let insertQuery, values;

    if (userType === 'club') {
      insertQuery = "INSERT INTO Club (`clubname`, `facultyid`, `headSRN`, `type`) VALUES (?, ?, ?, ?)";
      values = [clubName, facultyId, headSrn, clubType];

      const insertQueryMember = "INSERT INTO Member (`SRN`, `name`, `email`, `password`, `sem`, `dept`, `phoneno`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const valuesMember = [headSrn, name, email, password, sem, dept, phoneno, gender];

      db.query(insertQueryMember, valuesMember, (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }

        db.query(insertQuery, values, (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }

          const insertQueryClubMember = "INSERT INTO ClubMember (`SRN`, `clubname`) VALUES (?, ?)";
          const valuesClubMember = [headSrn, clubName];

          db.query(insertQueryClubMember, valuesClubMember, (err, data) => {
            if (err) {
              return res.status(500).json(err);
            }

            return res.status(200).json("Club has been created");
          });
        });
      });
    } else if (userType === 'member') {
      const checkDomainQuery = "SELECT domainid FROM Domain WHERE LOWER(domainname) = LOWER(?)";

      db.query(checkDomainQuery, [domain], (err, domainData) => {
        if (err) {
          return res.status(500).json(err);
        }

        if (domainData.length === 0) {
          return res.status(404).json("Domain not found");
        }

        const domainId = domainData[0].domainid;

        insertQuery = "INSERT INTO Member (`SRN`, `name`, `email`, `password`, `sem`, `dept`, `phoneno`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        values = [srn, name, email, password, sem, dept, phoneno, gender];

        db.query(insertQuery, values, (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }

          const insertQueryMemberDomain = "INSERT INTO ClubDomain (`domainid`, `SRN`, `clubname`) VALUES (?, ?, ?)";
          const valuesMemberDomain = [domainId, srn, clubName];

          db.query(insertQueryMemberDomain, valuesMemberDomain, (err, data) => {
            if (err) {
              return res.status(500).json(err);
            }

            return res.status(200).json("User has been created");
          });
          const insertQueryClubMember = "INSERT INTO ClubMember (`SRN`, `clubname`) VALUES (?, ?)";
          const valuesClubMember = [srn, clubName];

          db.query(insertQueryClubMember, valuesClubMember, (err, data) => {
            if (err) {
              return res.status(500).json(err);
            }

            return res.status(200).json("Club has been created");
          });
        });
      });
    } else {
      return res.status(400).json("Invalid user type");
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