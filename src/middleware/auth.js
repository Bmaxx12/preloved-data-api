const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Protect routes - memerlukan autentikasi
exports.protect = async (req, res, next) => {
  let token;

  // Cek token di header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Pastikan token ada
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Tidak ada akses. Silakan login terlebih dahulu'
    });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil user dari database
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Akun Anda telah dinonaktifkan'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau sudah expired'
    });
  }
};

// Authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} tidak memiliki akses ke resource ini`
      });
    }
    next();
  };
};

// Optional auth - tidak wajib login tapi jika ada token akan di-decode
exports.optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Jika token invalid, lanjutkan tanpa user
      req.user = null;
    }
  }

  next();
};