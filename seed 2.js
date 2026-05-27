// seed.js
// Run this once to populate the database with sample data
// Usage: node seed.js

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const sampleProducts = [
  { name: 'Wireless Headphones', description: 'Premium noise-cancelling headphones with 30hr battery', price: 79.99, category: 'Electronics', stock: 50, rating: 4.5, numReviews: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300' },
  { name: 'Running Shoes', description: 'Lightweight running shoes for all terrains', price: 59.99, category: 'Sports', stock: 30, rating: 4.2, numReviews: 85, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300' },
  { name: 'JavaScript Cookbook', description: 'Complete guide to modern JavaScript development', price: 29.99, category: 'Books', stock: 100, rating: 4.7, numReviews: 200, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300' },
  { name: 'Smartphone Stand', description: 'Adjustable aluminum stand for phones and tablets', price: 19.99, category: 'Electronics', stock: 80, rating: 4.0, numReviews: 60, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300' },
  { name: 'Yoga Mat', description: 'Non-slip eco-friendly yoga mat, 6mm thick', price: 34.99, category: 'Sports', stock: 45, rating: 4.6, numReviews: 150, image: 'https://images.unsplash.com/photo-1601925228209-a1b0eafff0a4?w=300' },
  { name: 'Coffee Maker', description: 'Programmable 12-cup coffee maker with timer', price: 49.99, category: 'Home', stock: 25, rating: 4.3, numReviews: 95, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300' },
  { name: 'Cotton T-Shirt', description: 'Soft 100% organic cotton t-shirt, available in multiple colors', price: 24.99, category: 'Clothing', stock: 200, rating: 4.1, numReviews: 300, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300' },
  { name: 'Face Moisturizer', description: 'Hydrating daily moisturizer with SPF 30', price: 18.99, category: 'Beauty', stock: 60, rating: 4.4, numReviews: 110, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300' },
  { name: 'Mechanical Keyboard', description: 'RGB backlit mechanical keyboard with tactile switches', price: 89.99, category: 'Electronics', stock: 35, rating: 4.8, numReviews: 180, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300' },
  { name: 'Dumbbell Set', description: '5-25lb adjustable dumbbell set with rack', price: 149.99, category: 'Sports', stock: 15, rating: 4.9, numReviews: 75, image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=300' },
  { name: 'Throw Pillow', description: 'Decorative throw pillow with removable cover', price: 14.99, category: 'Home', stock: 120, rating: 3.9, numReviews: 45, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300' },
  { name: 'Denim Jacket', description: 'Classic denim jacket with button closure', price: 54.99, category: 'Clothing', stock: 70, rating: 4.2, numReviews: 88, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300' },
];

const sampleAdmin = {
  name: 'Admin User',
  email: 'admin@shop.com',
  password: 'admin123',
  role: 'admin',
};

const seedDatabase = async () => {
  await connectDB();

  // Clear existing data
  await Product.deleteMany();
  await User.deleteMany();

  // Insert sample data
  await Product.insertMany(sampleProducts);
  await User.create(sampleAdmin);

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin login: admin@shop.com | 🔑 Password: admin123');
  process.exit();
};

seedDatabase();
