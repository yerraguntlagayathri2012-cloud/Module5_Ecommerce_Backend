// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRecommendations,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);                              // GET /api/products
router.get('/:id', getProductById);                       // GET /api/products/:id
router.get('/:id/recommendations', getRecommendations);   // GET /api/products/:id/recommendations

// Admin-only routes (must be logged in AND have admin role)
router.post('/', protect, adminOnly, createProduct);      // POST /api/products
router.put('/:id', protect, adminOnly, updateProduct);    // PUT /api/products/:id
router.delete('/:id', protect, adminOnly, deleteProduct); // DELETE /api/products/:id

module.exports = router;
