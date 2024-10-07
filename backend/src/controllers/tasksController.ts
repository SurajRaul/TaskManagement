import express, { Request, response, Response } from 'express';
import Task ,{ ITask } from '../models/Task';
import { ObjectId } from 'mongoose';

interface AuthReq extends Request {
    user: {
        id: ObjectId;
    }
}
interface updateT extends Request {
    body: {
        name: string;
        stage: number;
    }
}
const createTask = async (req: Request, res: Response): Promise<void> => {
    const { name, stage } = req.body;
    const authReq = req as AuthReq;
    const newTask = new Task({ name, userId: authReq.user.id, stage });
    try {
        await newTask.save();
        res.status(201).json({ message: 'New Task created' });
    } catch {
        res.status(400).json({ message: 'Err creating task' });
    }
}

const getAll = async (req: Request, res: Response) => {
    const authReq = req as AuthReq;
    try {
        const tasks = await Task.find({ userId: authReq.user.id });
        res.json(tasks);
    } catch {
        res.status(404).json({ message: 'data not found' });
    }
}

const updateTask = async (req: Request, res: Response) => {
    const { name, stage } = req.body;
    const authReq = req as AuthReq & updateT;
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { name, stage }, { new: true });
        if (!task) {
            res.status(404).json({ message: 'task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: 'Error updating task', err });
    }
}

const deleteTask = async (req: Request, res: Response) => {
    const authReq = req as AuthReq;
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'deleted' })  //204---no content to send
    } catch (err) {
        res.status(404).json({ message: 'err deletingtask', err });
    }
}

const moveTask = async (req: Request, res: Response) => {
    const authReq = req as AuthReq;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (req.params.direction === 'forward' && task.stage < 3) {
            task.stage += 1;
        } else if (req.params.direction === 'backward' && task.stage > 0) {
            task.stage -= 1;
        }
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Err while moving',err });  //500---Internal server error

    }
}

const getTaskStats= async (req: Request,res:Response) => {
    const authReq = req as AuthReq;
    try{
        const tasks:ITask[]=await Task.find({userId:authReq.user.id});
        const totalTasks=tasks.length;
        const totalCompleted=tasks.filter(task => task.stage === 3).length;
        const totalPending = tasks.filter(task => task.stage < 3).length;

        const today=new Date();
        const weekStart= new Date(today.setDate(today.getDate()-today.getDay()+ (today.getDay() === 0 ? -6 : 1)));

        const weekly=tasks.filter(task => {
            return new Date(task.createdAt) >= weekStart;
        })
        const totalW = weekly.length;
        const totalCompletedW = weekly.filter(task => task.stage === 3).length;
        const totalPendingW = weekly.filter(task => task.stage < 3).length;  

        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthlyTasks = tasks.filter(task => {
            return new Date(task.createdAt) >= monthStart;
        });

        const totalM = monthlyTasks.length;
        const totalCompletedM = monthlyTasks.filter(task => task.stage === 3).length;
        const totalPendingM = monthlyTasks.filter(task => task.stage < 3).length;

        res.json({
            totalTasks,totalCompleted,totalPending,
            weekly:{
                total:totalW, completed: totalCompletedW, pending: totalPendingW
            },
            monthly: {
                total:totalM, completed: totalCompletedM, pending: totalPendingM 
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Stats LOading error'});
    }
}

export { createTask, getAll, updateTask, deleteTask, moveTask, getTaskStats}
