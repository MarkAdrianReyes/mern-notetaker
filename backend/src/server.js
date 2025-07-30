import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import routes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/ratelimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
  }));
}

// Middleware to parse JSON requests
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", routes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}

connectDB().then(() => {
  app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})