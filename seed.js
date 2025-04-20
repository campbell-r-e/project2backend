const mongoose = require('mongoose');
const User = require('./models/account'); 
const LogbookEntry = require('./models/logbook');
const Access = require('./models/access');


const MONGODB_URI = 'mongodb://localhost:27017/logbookdb';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');


    await Access.deleteMany({});
    await User.deleteMany({});
    await LogbookEntry.deleteMany({});
    console.log('🧹 Cleared existing collections');

    
    const access = new Access({ access: 'basic' });
    await access.save();
    console.log('🔑 Access level created:', access);

  
    const user = new User({
      email: 'test@example.com',
      password: 'hashedpassword', 
      access: access._id
    });
    await user.save();
    console.log('👤 User created:', user);

   
    const entries = [
      {
        User: user._id,
        call: 'K9ABC',
        qso_date: '20250418',
        time_on: '2359',
        band: '20m',
        mode: 'SSB',
        rst_sent: '59',
        rst_rcvd: '59',
        station_callsign: 'KD9GEK',
        my_gridsquare: 'EN70',
        gridsquare: 'EM79',
        tx_pwr: '100',
        country: 'United States'
      },
      {
        User: user._id,
        call: 'W1AW',
        qso_date: '20250417',
        time_on: '1230',
        band: '40m',
        mode: 'CW',
        rst_sent: '599',
        rst_rcvd: '599',
        station_callsign: 'KD9GEK',
        my_gridsquare: 'EN70',
        tx_pwr: '100',
        country: 'United States'
      }
    ];

    await LogbookEntry.insertMany(entries);
    console.log(`Inserted ${entries.length} logbook entries.`);

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();
