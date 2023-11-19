// adminController.js
import { db } from '../db.js';

export const getClubDetails = (req, res) => {
  const { clubName } = req.params;

  // Logic to fetch club details based on clubName from the database
  const getClubDetailsQuery = "SELECT * FROM Club WHERE clubName = ?";
  
  db.query(getClubDetailsQuery, [clubName], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      // Send club details as a response
      return res.status(200).json(data[0]);
    } else {
      return res.status(404).json("Club not found!");
    }
  });
};

