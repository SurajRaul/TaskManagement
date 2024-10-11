import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ErrorResObj } from "../utility/responseSegregator";

dotenv.config();

// let jwtSecret: string;
// jwtSecret = process.env.JWT_SECRET || 'abcdefg';

interface AuthRequest extends Request {
    user?: { id: any };
}

const authMid = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();
    if (!token) {
        return ErrorResObj(res, 'Token not found', 400);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.user = { id: decoded.id };
        next();
    } catch {
        return ErrorResObj(res, 'Token is not valid', 400);
    }
}

export { authMid };