import mongoose, {Document,Schema} from "mongoose";

interface ITask extends Document{
name: string;
stage: number;
userId: mongoose.Schema.Types.ObjectId;
createdAt?: any;
}

const TaskSchema:Schema= new Schema(
    {
    name:{ type: String},
    stage: { type: Number},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    { timestamps: true }
)

const TaskModel=mongoose.model<ITask>('Task',TaskSchema);
export default TaskModel;
export {ITask}