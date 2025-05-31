const jwt = require('jsonwebtoken');
const { ApiError } = require('./errorMiddleware');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Not authorized to access this route'));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new ApiError(401, 'User not found'));
      }

      req.user = user;
      next();
    } catch (error) {
      return next(new ApiError(401, 'Not authorized to access this route'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };
