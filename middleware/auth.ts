import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  username: string;
  
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      username?: string;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret') as TokenPayload;
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};