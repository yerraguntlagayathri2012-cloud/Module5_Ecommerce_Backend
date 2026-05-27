// middleware/authMiddleware.js
// Protects routes by verifying JWT tokens

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware: Verify user is logged in
const protect = async (req, res, next) => {
  let token;

  // JWT is sent in Authorization header as: "Bearer <token>"
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode the token to get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continue to route handler
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token, not authorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, not authorized' });
  }
};

// Middleware: Restrict route to admin only
const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = { protect, adminOnly };
