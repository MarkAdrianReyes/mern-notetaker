import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/ratelimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Adjust this to your frontend URL
}));
app.use(rateLimiter);

app.use("/api/notes", routes);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})