import express from "express"
import multer from 'multer';
import { addEvent, getEventDetails, getEvent, editEvent, deleteEvent } from "../controllers/event.js";

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle adding events
router.post("/:clubname/event", upload.single('banner'), addEvent);

router.get("/", getEventDetails);
router.get("/:clubname", getEvent);
router.post("/:clubname/:eventname/edit", upload.single('banner'), editEvent);
router.delete("/delete/:eventname", deleteEvent); //MAKE CHANGES!!!!!!!!

export default router;