import mongoose, {Document, Schema} from "mongoose";

interface IUser extends Document{
    username: string;
    email: string;
    contactNumber: string;
    password: string;
}

const UserSchema:Schema= new Schema({
    username: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    password: { type: String },
});

const UserModel=mongoose.model<IUser>('User',UserSchema);
export default UserModel;