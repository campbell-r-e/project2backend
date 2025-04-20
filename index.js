const express = require('express');
const mongoose = require('mongoose');
const feedRoutes = require('./routes/feed');

const app = express();


app.use(express.json());

// Routes
app.use('/feed', feedRoutes);

// Connect to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/logbookdb'; 

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  // Start server only after DB is connected
  app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
  });
})
.catch(err => {
  console.error(' MongoDB connection error:', err);
});
