// src/middleware/authMiddleware.ts

// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     req.body.user = decoded; // Store the decoded token data in req.user
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid token.' });
//   }
// };
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const blacklist = new Set<string>(); // In-memory blacklist

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  if (blacklist.has(token)) {
    return res.status(401).json({ message: 'Token has been invalidated. Please log in again.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded; // Store user data in request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

