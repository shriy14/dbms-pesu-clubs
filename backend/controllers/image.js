import { db } from "../db.js";

export const Upload = (req, res) => {
  const imageData = req.file.buffer;
  const { clubname } = req.params;
  // Update the 'banner' column in the 'event' table where 'clubname' is 'Club A'
  const updateQuery = 'UPDATE event SET banner = ? WHERE clubname = ?';
 

  db.query(updateQuery, [imageData, clubname], (err, results) => {
    if (err) {
      console.error('Error updating banner in the database:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }

    console.log('Banner updated in the database');
    return res.status(200).json({ message: 'Image uploaded and banner updated successfully' });
  });
};
