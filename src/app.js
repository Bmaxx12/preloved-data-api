const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger (optional - untuk development)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: '🛍️ Welcome to Preloved API',
    version: '2.0.0',
    author: 'Dunnow oi',
    endpoints: {
      // Auth endpoints
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      getProfile: 'GET /api/auth/me (Private)',
      updateProfile: 'PUT /api/auth/updateprofile (Private)',
      updatePassword: 'PUT /api/auth/updatepassword (Private)',
      
      // Product endpoints
      getAllProducts: 'GET /api/products',
      getProduct: 'GET /api/products/:id',
      getMyProducts: 'GET /api/products/my/products (Private)',
      getUserProducts: 'GET /api/products/user/:userId',
      createProduct: 'POST /api/products (Private)',
      updateProduct: 'PUT /api/products/:id (Private)',
      deleteProduct: 'DELETE /api/products/:id (Private)'
    },
    documentation: 'See README.md for detailed documentation'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// Error Handler (harus di paling bawah)
app.use(errorHandler);

module.exports = app;