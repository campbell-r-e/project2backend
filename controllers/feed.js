const LogbookEntry = require('../models/logbook');
const User = require('../models/account'); 
exports.getalldata_by_user = async (req, res) => {
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
  // controllers/authController.js
const jwt = require('jsonwebtoken');

// Dummy user for demonstration (in real apps, check DB)
const USER = {
  username: 'admin',
  password: 'password123', // NEVER store plain-text passwords in real apps!
};

const SECRET_KEY = 'your-secret-key'; // Replace with env variable in production

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (username === USER.username && password === USER.password) {
    // Create a JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // Optionally, set HttpOnly cookie instead:
    // res.cookie('auth_token', token, { httpOnly: true, secure: true });

    return res.json({ success: true, token });
  }

  // Failed login
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
};
