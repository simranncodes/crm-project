import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

/**
 * Seeds admin accounts into the database.
 *
 * Usage (from /backend):
 *   npm run seed:admin            -> create admins that don't exist yet (safe to re-run)
 *   npm run seed:admin -- --force -> also reset password/name of admins that already exist
 *   npm run seed:admin -- --reset -> delete ALL admins first, then create them again
 *
 * The primary admin comes from ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME in .env.
 * Add more admins to the `extraAdmins` list below if you need them.
 */
const admins = [
  {
    name: process.env.ADMIN_NAME || 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@leaddesk.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@12345',
  },
  // Example extra admin (uncomment to use):
  // { name: 'Sales Manager', email: 'sales@leaddesk.com', password: 'Sales@12345' },
];

const args = new Set(process.argv.slice(2));
const FORCE = args.has('--force');
const RESET = args.has('--reset');

const EMAIL_RE = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;

const validate = ({ name, email, password }) => {
  if (!name?.trim()) return 'name is required';
  if (!EMAIL_RE.test(email || '')) return `invalid email "${email}"`;
  if (!password || password.length < 6) return 'password must be at least 6 characters';
  return null;
};

const seedAdmins = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set in backend/.env');
  }

  await connectDB();

  if (RESET) {
    const { deletedCount } = await Admin.deleteMany({});
    console.log(`Removed ${deletedCount} existing admin(s).`);
  }

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const data of admins) {
    const problem = validate(data);
    if (problem) {
      console.warn(`Skipping "${data.email}": ${problem}`);
      skipped++;
      continue;
    }

    const email = data.email.trim().toLowerCase();
    const existing = await Admin.findOne({ email });

    if (!existing) {
      await Admin.create({ name: data.name.trim(), email, password: data.password });
      console.log(`Created   ${email}`);
      created++;
    } else if (FORCE) {
      existing.name = data.name.trim();
      existing.password = data.password; // pre-save hook re-hashes it
      await existing.save();
      console.log(`Updated   ${email} (name and password reset)`);
      updated++;
    } else {
      console.log(`Exists    ${email} (use --force to reset its password)`);
      skipped++;
    }
  }

  console.log(`\nDone. Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`);
  if (created || updated) {
    console.log('Log in at /login with the email and password defined in your .env (or the list above).');
  }
};

seedAdmins()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(`Failed to seed admins: ${err.message}`);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
