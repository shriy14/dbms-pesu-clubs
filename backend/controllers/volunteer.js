import { db } from '../db.js';
export const addVolunteer = async (req, res) => {
    const { SRN, eventname } = req.body;
    const insertQuery = "INSERT INTO Volunteer (`SRN`, `eventname`) VALUES (?, ?)";
    const values = [SRN, eventname];

    db.query(insertQuery, values, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json("Volunteer!");
    });
};