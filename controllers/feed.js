const LogbookEntry = require('../models/logbook.model');
exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First Post', content: 'This is the first post!' }]
    });
};
exports.getalldata_by_user = async (req, res) => {
    const userId = req.query.user;
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const entries = await LogbookEntry.find({ user: userId }).populate('user');
      res.json(entries);
    } catch (err) {
      console.error('Error fetching logbook entries:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };