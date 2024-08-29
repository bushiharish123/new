import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { token, isAthlet } = await loginUser(req.body.email, req.body.password);
    res.json({ token, isAthlet });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};
