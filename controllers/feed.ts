import LogbookEntry from '../models/logbook.js';
import User from '../models/account.js';
import { Request, Response } from 'express';


interface IUserWithComparePassword extends Document {
  comparePassword(password: string): Promise<boolean>;
  username?: string;
  email?: string;
  password?: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
}


export const getalldata_by_user = async (req: Request, res: Response) => {
    const userEmail = req.query.user;
    console.log('[SERVER] Incoming user:', userEmail);
  
    if (!userEmail || typeof userEmail !== 'string' || !userEmail.includes('@')) {
      console.warn('[SERVER] Invalid or missing user email');
      return res.status(200).json([]); 
    }
  
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const entries = await LogbookEntry.find({ User: user._id }).populate('User');
      res.json(entries);
    } catch (err) {
      console.error('Error fetching logbook entries:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body as LoginRequest;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' } as LoginResponse);
      }
  
      const isMatch = await (user as unknown as IUserWithComparePassword).comparePassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' } as LoginResponse);
      }
  
      // Password matched
      return res.json({ success: true, message: 'Login successful' } as LoginResponse);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' } as LoginResponse);
    }
  };


export default {
    getalldata_by_user,
    login
};
