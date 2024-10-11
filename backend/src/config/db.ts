import mongoose from "mongoose";

export function dbConnect(){
mongoose.connect(process.env.Connection_String!).then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log('Database not conn')
    console.error('Database connection error:', err.message);
});
}

