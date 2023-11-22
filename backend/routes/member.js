import express from 'express';
import { getMemberDetails, getAllMembersInClub, addClubToMember, getMemberCountInClub, getBudget, deleteMember} from '../controllers/member.js';

const router = express.Router();

// Define the route to get club details
router.get("/:srn", getMemberDetails);
// router.get("/admin/:clubname", getAllMembersInClub);
router.post("/:srn", addClubToMember);
router.get("/admin/allmembers/:clubname", getAllMembersInClub);
router.get("/admin/count/:clubname", getMemberCountInClub);
router.get("/admin/budget/:clubname", getBudget);
router.delete("/delete/:srn", deleteMember);
export default router;
