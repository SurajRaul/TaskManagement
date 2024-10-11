import mongoose, {Document,Schema} from "mongoose";

interface ITask extends Document{
name: string;
stage: number;
priority: string;
description:string;
type:string;
project:string
userId: mongoose.Schema.Types.ObjectId;
createdAt?: any;
}

const TaskSchema:Schema= new Schema(
    {
    name:{ type: String},
    stage: { type: Number},
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    description:{type:String},
    type:{type:String, enum: ['Testing', 'Development', 'Deployment','Build']},
    project:{type:String, enum: ['Deloite', 'Infosys', 'Tcs','Mahindra']},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    { timestamps: true }
)

const TaskModel=mongoose.model<ITask>('Task',TaskSchema);
export default TaskModel;
export {ITask}