const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, default: 'recruiter' }, // Can be 'admin' or 'recruiter'
  visits: [{ type: Date, default: Date.now }],
  resumesDownloaded: [{
    roleInterest: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Recruiter', recruiterSchema);
