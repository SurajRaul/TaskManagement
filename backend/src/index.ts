import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import mongoose from "mongoose";

const app=express();

mongoose.connect("mongodb+srv://surajraul98:M2XTm9S3NFJFsej9@cluster0.0mmjujh.mongodb.net/task_management?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("Database connected");
}).catch(err => {
  console.error('Database connection error:', err.message);
});

app.use(cors());
app.use(express.json());

const PORT: number=4000;
app.use('/auth',authRoutes);
app.use('/tasks',taskRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
