import express from 'express';
import { register,login } from '../controllers/authController';
import { check } from 'express-validator';
const router= express.Router();

router.post('/register',[
    check('username','Username should not be empty').not().isEmpty(),
    check('email','Please enter valid Email').isEmail(),
    check('contactNumber','Contact number should be 10 digit').isLength({ min:10}),
    check('password','Password must be at least 6 character long').isLength({min:6})
],register);

router.post('/login',[
    check('email','Please enter valid Email').isEmail(),
    check('password','Password must be at least 6 character long').isLength({min:6})
],login);

export default router;
