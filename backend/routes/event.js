import express from "express"
import { getEventDetails,getEvent, editEvent, deleteEvent  } from "../controllers/event.js";

const router = express.Router()


// router.post("/:clubname/event", event);
router.get("/", getEventDetails);
router.get("/:clubname", getEvent);
router.put("/:eventid", editEvent);
router.delete("/:eventid", deleteEvent);

export default router;