import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import mongoose from "mongoose";
import { dbConnect } from './config/db';
const app=express();
dbConnect();

app.use(cors());
app.use(express.json());

const PORT: number=4000;
app.use('/auth',authRoutes);
app.use('/tasks',taskRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
