import { Request, Response } from 'express';
import { registerUser, loginUser, sportsList, searchByNames } from '../services/authService';
import { blacklist } from '../middleware/authMiddleware';
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
export const getSports= async(req:Request,res:Response)=>{
  try {
    const list = await sportsList(req,res);
    res.json(list);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
}

export const searchByName = async(req:Request,res:Response)=>{
  try{
    const details = await searchByNames(req);
    res.json(details);
  }catch (error:any) {
    res.status(400).json({ error: error.message });
  }
}
export const logout = (req: Request, res: Response) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  // Add the token to the blacklist
  blacklist.add(token);

  res.status(200).json({ message: 'User logged out successfully' });
};
