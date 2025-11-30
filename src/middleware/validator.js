// Validator untuk Product
exports.validateProduct = (req, res, next) => {
  const { 
    nama_barang, 
    ukuran, 
    kondisi, 
    brand, 
    kategori, 
    deskripsi, 
    harga, 
    bahan, 
    link_gambar 
  } = req.body;

  const errors = [];

  // Validasi required fields
  if (!nama_barang || nama_barang.trim() === '') {
    errors.push('Nama barang wajib diisi');
  }

  if (!ukuran || ukuran.trim() === '') {
    errors.push('Ukuran wajib diisi');
  }

  if (!kondisi || kondisi.trim() === '') {
    errors.push('Kondisi wajib diisi');
  }

  if (!brand || brand.trim() === '') {
    errors.push('Brand wajib diisi');
  }

  if (!kategori || kategori.trim() === '') {
    errors.push('Kategori wajib diisi');
  }

  if (!deskripsi || deskripsi.trim() === '') {
    errors.push('Deskripsi wajib diisi');
  }

  if (!harga || harga.trim() === '') {
    errors.push('Harga wajib diisi');
  }

  if (!bahan || bahan.trim() === '') {
    errors.push('Bahan wajib diisi');
  }

  if (!link_gambar || link_gambar.trim() === '') {
    errors.push('Link gambar wajib diisi');
  }

  // Validasi enum kondisi
  const validKondisi = [
    'Baru dengan tag', 
    'Baru tanpa tag', 
    'Sangat baik', 
    'Baik', 
    'Memuaskan', 
    'Bekas, mulus'
  ];
  
  if (kondisi && !validKondisi.includes(kondisi)) {
    errors.push(`Kondisi harus salah satu dari: ${validKondisi.join(', ')}`);
  }

  // Validasi enum kategori
  const validKategori = [
    'Sepatu', 
    'Jaket', 
    'Tas', 
    'Aksesoris', 
    'Kemeja', 
    'Kaos', 
    'Celana'
  ];
  
  if (kategori && !validKategori.includes(kategori)) {
    errors.push(`Kategori harus salah satu dari: ${validKategori.join(', ')}`);
  }

  // Validasi panjang karakter
  if (nama_barang && nama_barang.length > 200) {
    errors.push('Nama barang maksimal 200 karakter');
  }

  if (deskripsi && deskripsi.length > 1000) {
    errors.push('Deskripsi maksimal 1000 karakter');
  }

  // Jika ada error, return response error
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors
    });
  }

  // Jika tidak ada error, lanjutkan
  next();
};

// Validator untuk Register
exports.validateRegister = (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Nama wajib diisi');
  }

  if (!email || email.trim() === '') {
    errors.push('Email wajib diisi');
  } else {
    // Validasi format email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      errors.push('Format email tidak valid');
    }
  }

  if (!password || password.trim() === '') {
    errors.push('Password wajib diisi');
  } else if (password.length < 6) {
    errors.push('Password minimal 6 karakter');
  }

  if (!phone || phone.trim() === '') {
    errors.push('Nomor telepon wajib diisi');
  }

  if (name && name.length > 100) {
    errors.push('Nama maksimal 100 karakter');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors
    });
  }

  next();
};

// Validator untuk Login
exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim() === '') {
    errors.push('Email wajib diisi');
  }

  if (!password || password.trim() === '') {
    errors.push('Password wajib diisi');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors
    });
  }

  next();
};