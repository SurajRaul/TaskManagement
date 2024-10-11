import express from 'express';
import { authMid } from '../middleware/authMid';
import { createTask, getAll, updateTask, deleteTask, moveTask } from '../controllers/tasksController';
import { check } from 'express-validator';
const router = express.Router();

const validateTask = [
    check('name').not().isEmpty().withMessage('Task name is required').isString().withMessage('Task name must be a string'),
    check('stage').isInt({ min: 0, max: 3 }).withMessage('Stage must be an integer between 0 and 3'),
    check('priority').optional().isString().withMessage('Priority must be a string')
];

router.post('/', authMid,validateTask, createTask);
router.get('/', authMid, getAll);
router.put('/:id', authMid,validateTask, updateTask);
router.delete('/:id', authMid, deleteTask);
router.patch('/:id/move/:direction', authMid, moveTask);

export default router;






