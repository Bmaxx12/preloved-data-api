const Product = require('../models/product');

// @desc    Get semua produk dengan filter dan search
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res, next) => {
  try {
    const { kategori, brand, kondisi, search, sort, page = 1, limit = 20 } = req.query;
    
    // Build filter object
    let filter = {};
    
    if (kategori) {
      filter.kategori = kategori;
    }
    
    if (brand) {
      filter.brand = brand;
    }
    
    if (kondisi) {
      filter.kondisi = kondisi;
    }
    
    // Search query
    if (search) {
      filter.$or = [
        { nama_barang: { $regex: search, $options: 'i' } },
        { deskripsi: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOption = {};
    if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'name_asc') {
      sortOption = { nama_barang: 1 };
    } else if (sort === 'name_desc') {
      sortOption = { nama_barang: -1 };
    } else {
      sortOption = { createdAt: -1 }; // Default: terbaru
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      total: total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data_barang: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get produk berdasarkan ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }
    next(error);
  }
};

// @desc    Tambah produk baru
// @route   POST /api/products
// @access  Public (bisa diubah jadi Private dengan auth)
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update produk
// @route   PUT /api/products/:id
// @access  Public (bisa diubah jadi Private dengan auth)
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return document setelah update
        runValidators: true // Jalankan validasi schema
      }
    );

    res.json({
      success: true,
      message: 'Produk berhasil diupdate',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Hapus produk
// @route   DELETE /api/products/:id
// @access  Public (bisa diubah jadi Private dengan auth)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Produk berhasil dihapus',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get produk berdasarkan kategori
// @route   GET /api/products/kategori/:kategori
// @access  Public
exports.getProductsByKategori = async (req, res, next) => {
  try {
    const { kategori } = req.params;
    const products = await Product.find({ kategori });

    res.json({
      success: true,
      count: products.length,
      kategori: kategori,
      data_barang: products
    });
  } catch (error) {
    next(error);
  }
};