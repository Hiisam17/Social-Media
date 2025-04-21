const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Lỗi server' });
});

// Start server
const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
  console.log('Cấu hình database:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER
  });
}); 