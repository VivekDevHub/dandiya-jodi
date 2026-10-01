import dotenv from 'dotenv';
dotenv.config();

import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

let isConnected = false;

export default async function handler(req, res) {
  // Ensure database is connected before handling request
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error('MongoDB connection error in serverless handler:', err);
    }
  }

  // Pass request to Express app
  return app(req, res);
}
