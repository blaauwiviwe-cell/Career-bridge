const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Validation errors
  if (err.validationErrors) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.validationErrors
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(403).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(403).json({ error: 'Token expired' });
  }

  // Database errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({ error: 'Record already exists' });
  }

  if (err.code === 'ER_NO_REFERENCED_ROW') {
    return res.status(404).json({ error: 'Referenced record not found' });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    status: err.status || 500
  });
};

module.exports = errorHandler;
