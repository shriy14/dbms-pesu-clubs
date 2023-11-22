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
  const { clubname } = req.params;
  const { eventname } = req.params;

  const {
    newEventName,
    description,
    loc,
    type,
    timestamp,
    budget,
    registrationlink,
  } = req.body;
  const banner = req.file;

  const setValues = [];
  const setColumns = [];

  if (newEventName !== null && newEventName !== '') {
    setColumns.push('eventname=?');
    setValues.push(newEventName);
  }
  if (description !== null && description !== '') {
    setColumns.push('description=?');
    setValues.push(description);
  }
  if (loc !== null && loc !== '') {
    setColumns.push('loc=?');
    setValues.push(loc);
  }
  if (type !== null && type !== '') {
    setColumns.push('type=?');
    setValues.push(type);
  }
  if (timestamp !== null && timestamp !== '') {
    setColumns.push('timestamp=?');
    setValues.push(timestamp);
  }
  if (budget !== null && budget !== '') {
    setColumns.push('budget=?');
    setValues.push(budget);
  }
  if (registrationlink !== null && registrationlink !== '') {
    setColumns.push('registrationlink=?');
    setValues.push(registrationlink);
  }
  if (banner !== null && banner !== undefined) {
    setColumns.push('banner=?');
    setValues.push(banner.buffer); // Assuming req.file is a Buffer
  }

  if (setColumns.length === 0) {
    // No valid columns to update
    res.status(400).json({ error: 'No valid update parameters provided' });
    return;
  }

  const setClause = setColumns.join(', ');

  const q = `
    UPDATE Event
    SET ${setClause}
    WHERE clubname=? AND eventname=?
  `;

  const queryParams = [...setValues, clubname, eventname];

  db.query(q, queryParams, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.status(200).json({ message: 'Event updated successfully' });
  });
};

export const deleteEvent = (req, res) => {
  
  const { eventname } = req.params;

  const q = 'DELETE FROM Event WHERE eventname = ?';

  db.query(q, [eventname], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  });
};


export const addEvent = (req, res) => {
  const { clubname } = req.params;
  const {
    eventname,
    description,
    loc,
    type,
    timestamp,
    budget,
    registrationlink,
  } = req.body;
  const banner = req.file;



  const insertEventQuery = `
    INSERT INTO Event 
    (clubname, eventname, description, loc, type, timestamp, budget, registrationlink, banner) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    clubname,
    eventname,
    description,
    loc,
    type,
    timestamp,
    budget,
    registrationlink,
    banner ? banner.buffer : null,
  ];

  db.query(insertEventQuery, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(201).json({ message: 'Event added successfully', eventId: result.insertId });
  });
};