import { db } from "../db.js";
import bcrypt from "bcrypt";


export const register = (req, res) => {
  const { email, password, userType, clubName, facultyId, headSrn, srn, name, clubType } = req.body;

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

      const insertQueryMember = "INSERT INTO Member (`SRN`, `name`, `email`, `password`) VALUES ( ?, ?, ?, ?)";
      const valuesMember = [headSrn, name, email, password];

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
      insertQuery = "INSERT INTO Member (`SRN`, `name`, `email`, `password`) VALUES (?, ?, ?, ?)";
      values = [srn, name, email, password, clubName];

      db.query(insertQuery, values, (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }

        const insertQueryClubMember = "INSERT INTO ClubMember (`SRN`, `clubname`) VALUES (?, ?)";
        const valuesClubMember = [srn, clubName];

        db.query(insertQueryClubMember, valuesClubMember, (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }

          return res.status(200).json("User has been created");
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
    // Club Head login logic
    const checkClubHeadQuery = `
  SELECT M.password as  clubPassword, C.*
  FROM Member M
  JOIN Club C ON M.SRN = C.headid
  WHERE C.clubName = ?`;

db.query(checkClubHeadQuery, [clubName], (err, data) => {
  if (err) {
    return res.status(500).json(err);
  }

  if (data.length) {
    const hashedPassword = data[0].clubPassword;

    if (bcrypt.compareSync(password, hashedPassword)) {
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
    // Regular Member login logic
    const checkMemberQuery = "SELECT * FROM Member WHERE SRN = ?";
    db.query(checkMemberQuery, [srn], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (data.length) {
        const result = bcrypt.compareSync(password, data[0].password);
        if (!result) return res.status(400).json("Wrong SRN/Password!");

        return res.status(200).json({
          message: "Member Logged in!",
          userType: 'member',
          SRN: data[0].SRN,
        });
      } else {
        return res.status(404).json("Member not found or wrong SRN/Password!");
      }
    });
  } else {
    return res.status(400).json("Invalid user type");
  }
};