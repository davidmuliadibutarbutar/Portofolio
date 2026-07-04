export function notFound(req, res) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err, req, res, next) {
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }
  return res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
}
