import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
let jwtSecret: any;
jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

interface AuthRequest extends Request {
    user?: { id: any };
}

const authMid = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();
    if (!token) {
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { id: string };
        req.user = { id: decoded.id };
        // res.json({ message: 'done'});
        next();
    } catch {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

export { authMid };