import LogbookEntry from '../models/logbook.js';
import User from '../models/account.js';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

interface TokenPayload {
  userId: string;
  username: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export const getalldata_by_user = async (req: Request, res: Response) => {
    const userEmail = req.username;
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
  
      const entries = await LogbookEntry.find({ User: user._id });
      const entriesWithId = entries.map(entry => ({
        ...entry.toObject(),
        id: entry._id.toString()
      }));
      res.json(entriesWithId);
    } catch (err) {
      console.error('Error fetching logbook entries:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body as LoginRequest;
  
    try {
      const user = await User.findOne({ email: username }); 
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' } as LoginResponse);
      }
  
      const isMatch = await (user as unknown as IUserWithComparePassword).comparePassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' } as LoginResponse);
      }


      const tokenPayload: TokenPayload = {
        userId: user._id.toString(),
        username: user.email
      };
      
      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET || 'your-fallback-secret',
        { expiresIn: '24h' }
      );
  
      return res.json({
        success: true,
        message: 'Login successful',
        token
      } as LoginResponse);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' } as LoginResponse);
    }
  };

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body as LoginRequest;

  try {
    const user = await User.findOne({ email: username });

    if (user) {
      return res.status(401).json({ success: false, message: 'failed' } as LoginResponse);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    
    const accessDoc = await (await import('../models/access.js')).default.findOne({ access: 'basic' });
    if (!accessDoc) {
      return res.status(500).json({ success: false, message: 'Access level not found' } as LoginResponse);
    }

    const newUser = new User({
      username,
      email: username,
      password: hashedPassword,
      access: accessDoc._id, 
    });

    await newUser.save();

    return res.json({ success: true, message: 'Signup was successful' } as LoginResponse);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' } as LoginResponse);
  }
};

export const createLogbookEntry = async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;

    const {
      call, qso_date, time_on, band, mode,
      rst_sent, rst_rcvd,
      freq, freq_rx, station_callsign, my_gridsquare,
      gridsquare, tx_pwr, operator, my_sig, my_sig_info,
      sig, sig_info, qsl_rcvd, qsl_sent,
      eqsl_qsl_rcvd, eqsl_qsl_sent, lotw_qsl_rcvd, lotw_qsl_sent,
      comment, qsl_rcvd_date, qsl_sent_date, time_off,
      prop_mode, sat_name, sat_mode, rx_pwr, ant_az, ant_el,
      contest_id, cqz, ituz, dxcc, country, qsl_via
    } = req.body;

    if (!call || !qso_date || !time_on || !band || !mode || !rst_sent || !rst_rcvd) {
      return res.status(400).json({ success: false, message: 'Missing required QSO fields' });
    }

    const entry = new LogbookEntry({
      User: username, 
      call, qso_date, time_on, band, mode, rst_sent, rst_rcvd,
      freq, freq_rx, station_callsign, my_gridsquare,
      gridsquare, tx_pwr, operator, my_sig, my_sig_info,
      sig, sig_info, qsl_rcvd, qsl_sent,
      eqsl_qsl_rcvd, eqsl_qsl_sent, lotw_qsl_rcvd, lotw_qsl_sent,
      comment, qsl_rcvd_date, qsl_sent_date, time_off,
      prop_mode, sat_name, sat_mode, rx_pwr, ant_az, ant_el,
      contest_id, cqz, ituz, dxcc, country, qsl_via
    });

    await entry.save();

    return res.status(201).json({ success: true, message: 'QSO logged successfully', entry });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error while logging QSO' });
  }
};





export const deleteLogbookEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
 
    const entry = await LogbookEntry.findByIdAndDelete(id);

    if (!entry) {
      return res.status(404).json({ success: false, message: 'Logbook entry not found' });
    }

    return res.status(200).json({ success: true, message: 'Logbook entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting logbook entry:', error);
    return res.status(500).json({ success: false, message: 'Server error while deleting logbook entry' });
  }
};
export default {
    getalldata_by_user,
    login
};
