import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

const missing = ['MONGO_URI', 'JWT_SECRET'].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

// Connect to MongoDB, then start the server.
// If the DB connection fails, connectDB exits the process (see config/db.js).
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`LeadDesk Mini API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
});

// Guard against unhandled promise rejections crashing the process silently
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
});
