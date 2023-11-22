import express from "express"
import { addVolunteer  } from "../controllers/volunteer.js";

const router = express.Router()

router.post('/member/:srn', addVolunteer);

export default router;