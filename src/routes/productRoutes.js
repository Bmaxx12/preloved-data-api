const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByKategori
} = require('..productController.js');
const { validateProduct } = require('../middleware/validator');

// Routes untuk /api/products
router.route('/')
  .get(getAllProducts)          // GET semua produk
  .post(validateProduct, createProduct);  // POST produk baru

// Route khusus untuk kategori (daftarkan sebelum route dynamic '/:id')
router.get('/kategori/:kategori', getProductsByKategori);

router.route('/:id')
  .get(getProductById)          // GET produk by ID
  .put(validateProduct, updateProduct)    // PUT update produk
  .delete(deleteProduct);       // DELETE produk

module.exports = router;