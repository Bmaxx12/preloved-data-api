const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nama_barang: {
    type: String,
    required: [true, 'Nama barang wajib diisi'],
    trim: true,
    maxlength: [200, 'Nama barang maksimal 200 karakter']
  },
  ukuran: {
    type: String,
    required: [true, 'Ukuran wajib diisi'],
    trim: true
  },
  kondisi: {
    type: String,
    required: [true, 'Kondisi wajib diisi'],
    enum: {
      values: ['Baru dengan tag', 'Baru tanpa tag', 'Sangat baik', 'Baik', 'Memuaskan', 'Bekas, mulus'],
      message: '{VALUE} bukan kondisi yang valid'
    }
  },
  brand: {
    type: String,
    required: [true, 'Brand wajib diisi'],
    trim: true
  },
  kategori: {
    type: String,
    required: [true, 'Kategori wajib diisi'],
    enum: {
      values: ['Sepatu', 'Jaket', 'Tas', 'Aksesoris', 'Kemeja', 'Kaos', 'Celana'],
      message: '{VALUE} bukan kategori yang valid'
    }
  },
  deskripsi: {
    type: String,
    required: [true, 'Deskripsi wajib diisi'],
    maxlength: [1000, 'Deskripsi maksimal 1000 karakter']
  },
  harga: {
    type: String,
    required: [true, 'Harga wajib diisi'],
    trim: true
  },
  bahan: {
    type: String,
    required: [true, 'Bahan wajib diisi'],
    trim: true
  },
  kontak_penjual: {
    type: String,
    required: [true, 'Kontak penjual wajib diisi'],
    trim: true
  },
  lokasi: {
    type: String,
    required: [true, 'Lokasi wajib diisi'],
    trim: true,
    default: 'Jakarta'
  },
  link_gambar: {
    type: String,
    required: [true, 'Link gambar wajib diisi'],
    trim: true
  }
}, {
  timestamps: true // Menambahkan createdAt dan updatedAt otomatis
});

// Index untuk mempercepat pencarian
productSchema.index({ nama_barang: 'text', deskripsi: 'text', brand: 'text' });
productSchema.index({ kategori: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ createdAt: -1 });

// Virtual untuk format harga (opsional)
productSchema.virtual('harga_numeric').get(function() {
  return this.harga.replace(/[^0-9]/g, '');
});

// Method untuk mencari produk serupa (opsional)
productSchema.methods.findSimilarProducts = function() {
  return this.model('Product').find({
    kategori: this.kategori,
    _id: { $ne: this._id }
  }).limit(5);
};

module.exports = mongoose.model('Product', productSchema);