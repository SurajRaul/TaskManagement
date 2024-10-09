import express, { Request, response, Response } from 'express';
import Task ,{ ITask } from '../models/Task';
import { ObjectId } from 'mongoose';
import { ErrorResObj, SucessResObj } from '../utility/responseSegregator';

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
        SucessResObj(res, 'New task created', newTask, 201);
    } catch(err) {
        ErrorResObj(res, `Error creating task: ${err}`, 500);
    }
}

const getAll = async (req: Request, res: Response) => {
    const authReq = req as AuthReq;
    try {
        const tasks = await Task.find({ userId: authReq.user.id });
        SucessResObj(res, 'Tasks retrieved successfully', tasks);
    } catch(err) {
        ErrorResObj(res, `Error fetching tasks: ${err}`, 500);
    }
}

const updateTask = async (req: Request, res: Response) => {
    const { name, stage } = req.body;
    const authReq = req as AuthReq & updateT;
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { name, stage }, { new: true });
        if (!task) {
            return ErrorResObj(res, 'Task not found', 404);
        }
        SucessResObj(res, 'Task updated successfully', task);
    } catch (err) {
        ErrorResObj(res, `Error updating task: ${err}`, 500);
    }
}

const deleteTask = async (req: Request, res: Response) => {
    const authReq = req as AuthReq;
    try {
        await Task.findByIdAndDelete(req.params.id);
        SucessResObj(res, 'Task deleted successfully', null, 204);
        } catch (err) {
        ErrorResObj(res, `Error deleting task: ${err}`, 500);
    }       
}

const moveTask: express.RequestHandler = async (req, res): Promise<void> => {
    const authReq = req as AuthReq; 
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return ErrorResObj(res, 'Task not found', 404);
        }

        if (req.params.direction === 'forward' && task.stage < 3) {
            task.stage += 1;
        } else if (req.params.direction === 'backward' && task.stage > 0) {
            task.stage -= 1;
        } else {
            return ErrorResObj(res, 'Cannot move task further', 400);
        }

        await task.save();
        SucessResObj(res, 'Task saved', task, 201);
    } catch (err) {
        return ErrorResObj(res, `Error while moving task ${err}`, 500);

    }
}

export { createTask, getAll, updateTask, deleteTask, moveTask}
