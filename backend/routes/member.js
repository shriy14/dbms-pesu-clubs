import express from 'express';
import { getMemberDetails, getAllMembersInClub,getMemberCountInClub } from '../controllers/member.js';

const router = express.Router();

// Define the route to get club details
router.get("/:srn", getMemberDetails);
router.get("/admin/:clubname", getAllMembersInClub);
router.get("/admin/:clubname", getMemberCountInClub);

export default router;
