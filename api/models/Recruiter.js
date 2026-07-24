const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Hashed password for manual login
  username: { type: String, required: true, unique: true },
  role: { type: String, default: 'recruiter' }, // Can be 'admin' or 'recruiter'
  visits: [{ type: Date, default: Date.now }],
  resumesDownloaded: [{
    roleInterest: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Recruiter', recruiterSchema);
