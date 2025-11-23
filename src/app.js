const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
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
    version: '1.0.0',
    author: 'Your Name',
    endpoints: {
      products: '/api/products',
      getAllProducts: 'GET /api/products',
      getProduct: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id'
    },
    documentation: 'See README.md for detailed documentation'
  });
});

// API Routes
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