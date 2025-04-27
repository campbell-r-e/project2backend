import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import feedRoutes from './routes/feed.js';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/feed', feedRoutes);


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/logbookdb';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT || 8080}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
