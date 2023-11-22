import express from "express";
import authRouter from "./routes/auth.js";
import adminRoutes from './routes/admin.js';
import memberRoutes from './routes/member.js';
import eventRouter from './routes/event.js'
import volRouter from './routes/volunteer.js'
import cors from "cors";
import uploadRoutes from './routes/image.js'
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRoutes); 
app.use("/api/member", memberRoutes); 
app.use("/api/events", eventRouter);
app.use("/api/volunteer", volRouter);
app.use('/api/up', uploadRoutes);
app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
