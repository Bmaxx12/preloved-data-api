const { body, validationResult } = require('express-validator');

// Validasi untuk Product
exports.validateProduct = [
  body('nama_barang')
    .trim()
    .notEmpty()
    .withMessage('Nama barang wajib diisi')
    .isLength({ max: 200 })
    .withMessage('Nama barang maksimal 200 karakter'),
  
  body('ukuran')
    .trim()
    .notEmpty()
    .withMessage('Ukuran wajib diisi'),
  
  body('kondisi')
    .notEmpty()
    .withMessage('Kondisi wajib diisi')
    .isIn(['Baru dengan tag', 'Baru tanpa tag', 'Sangat baik', 'Baik', 'Memuaskan', 'Bekas, mulus'])
    .withMessage('Kondisi tidak valid. Pilihan: Baru dengan tag, Baru tanpa tag, Sangat baik, Baik, Memuaskan, Bekas, mulus'),
  
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Brand wajib diisi'),
  
  body('kategori')
    .notEmpty()
    .withMessage('Kategori wajib diisi')
    .isIn(['Sepatu', 'Jaket', 'Tas', 'Aksesoris', 'Kemeja', 'Kaos', 'Celana'])
    .withMessage('Kategori tidak valid. Pilihan: Sepatu, Jaket, Tas, Aksesoris, Kemeja, Kaos, Celana'),
  
  body('deskripsi')
    .trim()
    .notEmpty()
    .withMessage('Deskripsi wajib diisi')
    .isLength({ max: 1000 })
    .withMessage('Deskripsi maksimal 1000 karakter'),
  
  body('harga')
    .trim()
    .notEmpty()
    .withMessage('Harga wajib diisi'),
  
  body('bahan')
    .trim()
    .notEmpty()
    .withMessage('Bahan wajib diisi'),
  
  body('kontak_penjual')
    .trim()
    .notEmpty()
    .withMessage('Kontak penjual wajib diisi'),
  
  body('lokasi')
    .optional()
    .trim(),
  
  body('link_gambar')
    .trim()
    .notEmpty()
    .withMessage('Link gambar wajib diisi')
    .isURL()
    .withMessage('Link gambar harus berupa URL yang valid (contoh: https://example.com/image.jpg)'),

  // Middleware untuk mengecek hasil validasi
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: errorMessages
      });
    }
    
    next();
  }
];