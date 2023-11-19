// adminRoutes.js
import express from 'express';
import { getClubDetails } from '../controllers/admin.js';

const router = express.Router();

// Define the route to get club details
router.get("/:clubName", getClubDetails);

export default router;
