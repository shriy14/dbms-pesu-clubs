// routes/image.js
import express from 'express';
import { Upload } from '../controllers/image.js';
import multer from 'multer'

const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Store the file as a buffer in memory
const upload = multer({ storage });

// Define the route for image upload
router.post('/', upload.single('image'), Upload);



export default router;
