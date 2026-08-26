import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    companyLogo: {
      type: String,
      default: '',
      trim: true,
    },
    jobRole: {
      type: String,
      required: [true, 'Job role is required'],
      trim: true,
    },
    jobUrl: {
      type: String,
      default: '',
      trim: true,
    },
    companyWebsite: {
      type: String,
      default: '',
      trim: true,
    },
    location: {
      type: String,
      default: 'Remote',
      trim: true,
    },
    workType: {
      type: String,
      enum: ['On-site', 'Remote', 'Hybrid'],
      default: 'Remote',
    },
    salary: {
      type: String,
      default: '',
      trim: true,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        'Wishlist',
        'Applied',
        'Screening',
        'Interview',
        'Technical Round',
        'Final Round',
        'Offer',
        'Rejected',
      ],
      default: 'Applied',
    },
    interviewDate: {
      type: Date,
      default: null,
    },
    jobDescription: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Add index for fast search & filtering
applicationSchema.index({ companyName: 'text', jobRole: 'text', location: 'text' });
applicationSchema.index({ status: 1, appliedDate: -1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
