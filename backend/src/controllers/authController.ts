import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

// let jwtSecret:any;
// jwtSecret = process.env.JWT_SECRET;
const jwtSecret: string = 'abcdefg'; 
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
    const { username, email, contactNumber, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, email, contactNumber, password: hashPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered' });  //201---created
    } catch (err) {
        res.status(400).json({ message: 'not register' });   //400--Bad request
    }
}

const login = async (req: LoginReq, res: any) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid CRedntial' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid CRedntial' });
        }

        const token = jwt.sign({ id: user._id}, jwtSecret, { expiresIn: '2h' });
        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: 'login failed',err })
    }
}

export { register, login }
