/* eslint-disable no-underscore-dangle */
import {
  connect, set, connection, Schema, model,
} from 'mongoose';

connect(
  'mongodb://localhost/jeffBot',
  { useNewUrlParser: true },
);
set('useCreateIndex', true);

// make connection and have error and open signalling
const db = connection;
db.on(
  'error',
  console.error.bind(console, 'Error connecting to the DATABASE'),
);

db.once('open', () => {
  console.log('Successfully connected to the DATABASE');
});

const jeffPerDaySchema = Schema({
  id: {
    type: String,
    unique: true,
  },
  day: String,
  number: Number,
});
const jeffPerChannelSchema = Schema({
  id: {
    type: String,
    unique: true,
  },
  channel: String,
  number: Number,
});
const jeffPerPersonSchema = Schema({
  id: {
    type: String,
    unique: true,
  },
  person: String,
  number: Number,
});

const Day = model('Day', jeffPerDaySchema);
const Channel = model('Channel', jeffPerChannelSchema);
const Person = model('Person', jeffPerPersonSchema);

const _Day = Day;
export { _Day as Day };
const _Channel = Channel;
export { _Channel as Channel };
const _Person = Person;
export { _Person as Person };
