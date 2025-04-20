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
  