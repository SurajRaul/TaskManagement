import express, { Request, response, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import * as dotenv from 'dotenv';
import { validationResult } from 'express-validator';
 import { SucessResObj,ErrorResObj } from '../utility/responseSegregator';
dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET || 'abcdefg'; 

interface RegisterReq extends Request {
    body: {
        username: string;
        email: string;
        contactNumber: string;
        password: string;
    }
}

interface LoginReq extends Request {
    body: {
        email: string;
        password: string;
    };
}


const register = async (req: RegisterReq, res: Response) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return ErrorResObj(res,`Express Validation errors : ${errors.array()}`, 400); 
    }

    const { username, email, contactNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return ErrorResObj(res,'User already exists with this email',400);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, email, contactNumber, password: hashPassword
        });
        await newUser.save();
        SucessResObj(res,'User registered sucessfully',null,201);
    } catch (err) {
        return ErrorResObj(res,'Registration Failed',400);
    }
}

const login = async (req: LoginReq, res: any) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return ErrorResObj(res, `Express Validation errors : ${errors.array()}`, 400); 
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return ErrorResObj(res, 'Invalid credentials', 400);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return ErrorResObj(res, 'Invalid credentials', 400);
        }

        const token = jwt.sign({ id: user._id}, jwtSecret, { expiresIn: '2h' });
        SucessResObj(res, 'Login successful', { token });
    } catch (err) {
        ErrorResObj(res, `Login failed: ${err}`, 500);
    }
}

export { register, login }
