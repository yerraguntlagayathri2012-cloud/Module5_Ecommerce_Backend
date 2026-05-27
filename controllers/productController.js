// controllers/productController.js
// Full CRUD for products + filtering, sorting, search, and recommendations

const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products with filtering, sorting, and searching
// @access  Public
// Query params: ?search=phone&category=Electronics&sort=price&order=asc&page=1&limit=8
const getProducts = async (req, res) => {
  try {
    const { search, category, sort, order, page = 1, limit = 8 } = req.query;

    // Build a filter object dynamically
    const filter = {};

    // Search by product name (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    // Filter by category
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Sort options: price, rating, name
    const sortOption = {};
    if (sort) {
      sortOption[sort] = order === 'desc' ? -1 : 1;
    } else {
      sortOption.createdAt = -1; // Default: newest first
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/products/:id
// @desc    Get a single product by ID
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/products
// @desc    Create a new product (admin only)
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route   PUT /api/products/:id
// @desc    Update a product (admin only)
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,        // Return updated doc
      runValidators: true, // Enforce schema rules
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route   DELETE /api/products/:id
// @desc    Delete a product (admin only)
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/products/:id/recommendations
// @desc    Simple recommendation: products in same category (RapidMiner-style logic)
// @access  Public
const getRecommendations = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Recommendation logic: same category, high rating, exclude current product
    const recommendations = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // Exclude current product
      rating: { $gte: 3 },       // Only well-rated items
    })
      .sort({ rating: -1 }) // Best rated first
      .limit(4);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRecommendations,
};
