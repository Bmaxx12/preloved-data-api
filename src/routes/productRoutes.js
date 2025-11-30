const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByKategori,
  getMyProducts,
  getProductsByUserId
} = require('../controller/productCOntroller');
const { protect, authorize } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validator');

// Public routes
router.get('/', getAllProducts);
router.get('/kategori/:kategori', getProductsByKategori);
router.get('/user/:userId', getProductsByUserId);
router.get('/:id', getProductById);

// Private routes (butuh login)
router.post('/', protect, validateProduct, createProduct);
router.get('/my/products', protect, getMyProducts); // Harus di atas /:id
router.put('/:id', protect, validateProduct, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;