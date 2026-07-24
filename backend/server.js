require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const axios = require('axios');
const Recruiter = require('./models/Recruiter');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Email Transporter (Nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const sendAdminAlert = async (recruiter) => {
  if(!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `🚨 New Recruiter Visit: ${recruiter.name}`,
    text: `A recruiter has logged into your portfolio.\n\nName: ${recruiter.name}\nEmail: ${recruiter.email}\nUsername: ${recruiter.username}\nTime: ${new Date().toLocaleString()}`
  };
  try { await transporter.sendMail(mailOptions); } catch (error) { console.error('Email alert failed:', error); }
};

// Passport Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let recruiter = await Recruiter.findOne({ googleId: profile.id });
      if (recruiter) {
        recruiter.visits.push(new Date());
        await recruiter.save();
      } else {
        const username = `recruiter_${Math.random().toString(36).substr(2, 6)}`;
        recruiter = await Recruiter.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          username,
          role: profile.emails[0].value === process.env.ADMIN_EMAIL ? 'admin' : 'recruiter'
        });
        await sendAdminAlert(recruiter);
      }
      return done(null, recruiter);
    } catch (error) {
      return done(error, null);
    }
  }
));

app.use(passport.initialize());

// Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.redirect(`${process.env.FRONTEND_URL}?token=${token}&name=${encodeURIComponent(req.user.name)}&role=${req.user.role}`);
});

// Middleware for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protected Routes
app.get('/api/admin/visits', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  try {
    const visits = await Recruiter.find().sort({ updatedAt: -1 });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/resume/generate', authenticateToken, async (req, res) => {
  try {
    const { roleInterest } = req.body;
    
    // Log the download
    await Recruiter.findByIdAndUpdate(req.user.id, {
      $push: { resumesDownloaded: { roleInterest } }
    });

    // Call ML Microservice
    const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL || 'http://localhost:8000'}/generate-resume`, {
      role: roleInterest,
      recruiter_id: req.user.id
    }, { responseType: 'arraybuffer' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Siva_Resume_${roleInterest}.pdf`);
    res.send(mlResponse.data);

  } catch (err) {
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Contact Form Submitted (Email not configured in .env):', { name, email, subject, message });
    return res.status(200).json({ success: true, warning: 'Credentials missing, logged to console instead.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'galabasivamanikanta8@gmail.com',
    subject: `Portfolio Contact: ${subject || 'New Message'}`,
    text: `You have received a new message from your portfolio contact form!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Contact Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
}

// Export the Express API for Vercel
module.exports = app;
