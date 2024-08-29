import express from 'express';
import { registerValidation, loginValidation, validate } from '../utils/validate';
import { register, login } from '../controllers/authController';

const router = express.Router();
console.log("Hello in routes")
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

export default router;
