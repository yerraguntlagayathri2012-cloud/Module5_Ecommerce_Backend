// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

console.log('🔧 PORT from .env:', process.env.PORT);
console.log('🔧 MONGO_URI loaded:', process.env.MONGO_URI ? 'YES' : 'NO ← .env missing!');

connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health check — visit http://localhost:6050/ to confirm server is up
app.get('/', (req, res) => {
  res.json({ message: '🛒 E-Commerce API is running!', port: process.env.PORT });
});

// Quick check — visit http://localhost:6050/api/check-admin to verify admin exists in DB
app.get('/api/check-admin', async (req, res) => {
  const User = require('./models/User');
  const admin = await User.findOne({ email: 'admin@shop.com' });
  if (admin) {
    res.json({ found: true, email: admin.email, role: admin.role });
  } else {
    res.json({ found: false, message: 'Admin not found — run: node seed.js' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
