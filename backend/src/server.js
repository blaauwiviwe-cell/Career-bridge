const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/careers', require('./routes/careers.routes'));
app.use('/api/bursaries', require('./routes/bursaries.routes'));
app.use('/api/internships', require('./routes/internships.routes'));
app.use('/api/applications', require('./routes/applications.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/studyplans', require('./routes/studyplans.routes'));
app.use('/api/ai', require('./routes/ai.routes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    status: err.status || 500
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Career Bridge Backend Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${process.env.DB_NAME || 'career_bridge'}`);
  console.log(`\nAPI Documentation: http://localhost:${PORT}/api`);
});

module.exports = app;
