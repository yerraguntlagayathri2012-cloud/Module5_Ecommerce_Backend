// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All order routes require login
router.post('/', protect, createOrder);                              // Create order
router.get('/myorders', protect, getMyOrders);                      // My orders
router.get('/:id', protect, getOrderById);                          // Single order

// Admin only
router.get('/', protect, adminOnly, getAllOrders);                   // All orders
router.put('/:id/status', protect, adminOnly, updateOrderStatus);   // Update status

module.exports = router;
