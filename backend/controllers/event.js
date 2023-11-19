import { db } from "../db.js";


export const getEventDetails = (req, res) => {
  db.query('SELECT * FROM Event', (err, events) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(200).json(events);
  });
};


export const getEvent = (req, res) => {
  const { clubname } = req.params;

  db.query('SELECT * FROM Event WHERE clubname = ?', [clubname], (err, events) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(200).json(events);
  });
};

export const editEvent = (req, res) => {
  // Handle edit event logic here...
};

export const deleteEvent = (req, res) => {
  // Handle delete event logic here...
};
