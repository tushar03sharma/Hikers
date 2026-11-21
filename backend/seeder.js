import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Trek from './models/trekModel.js';
import { treks } from '../src/data/treks.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Trek.deleteMany();

    // The frontend dummy data has an `id` field, but MongoDB creates `_id` automatically.
    // We can map the data to remove `id` to avoid confusion, although mongoose will just ignore it
    // if it's not in the schema.
    
    await Trek.insertMany(treks);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Trek.deleteMany();
    
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
