import mongoose from "mongoose";

export function dbConnect(){
mongoose.connect("mongodb+srv://surajraul98:M2XTm9S3NFJFsej9@cluster0.0mmjujh.mongodb.net/task_management?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log('Database not conn')
    console.error('Database connection error:', err.message);
});
}

