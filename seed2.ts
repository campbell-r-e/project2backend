import mongoose from 'mongoose';
import User from './models/account.ts';
import LogbookEntry from './models/logbook.ts';

const MONGODB_URI = 'mongodb://localhost:27017/logbookdb';

async function seedLogbookEntries() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await LogbookEntry.deleteMany({});
    console.log('🧹 Cleared existing logbook entries');

    const campbellUser = await User.findOne({ email: 'campbellreed2017@gmail.com' });
    if (!campbellUser) {
      console.log('User not found: campbellreed2017@gmail.com');
      return;
    }

    const entries = [
      {
        User: campbellUser._id,
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
        User: campbellUser._id,
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
    console.log(`Inserted ${entries.length} logbook entries for user ${campbellUser.email}.`);

  } catch (err) {
    console.error('Error seeding logbook entries:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedLogbookEntries();
