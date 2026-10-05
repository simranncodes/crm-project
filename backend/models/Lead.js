import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must be under 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address'],
    },
    PhoneNo: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\d{10,15}$/, 'Phone number must be 10 to 15 digits'],
    },
    budget: {
      type: String,
      required: [true, 'Budget range is required'],
      enum: {
        values: ['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+'],
        message: 'Please select a valid budget range',
      },
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [1000, 'Message must be under 1000 characters'],
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

// Index to speed up name/email search
leadSchema.index({ name: 'text', email: 'text' });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
