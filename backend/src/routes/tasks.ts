import express from 'express';
import { authMid } from '../middleware/authMid';
import { createTask, getAll, updateTask, deleteTask, moveTask } from '../controllers/tasksController';
const router = express.Router();

router.post('/', authMid, createTask);
router.get('/', authMid, getAll);
router.put('/:id', authMid, updateTask);
router.delete('/:id', authMid, deleteTask);
router.patch('/:id/move/:direction', authMid, moveTask);

export default router;

