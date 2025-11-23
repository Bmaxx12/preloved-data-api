// seed.js - Script untuk mengisi database dengan data awal
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Sample Data dari API referensi Anda
const sampleProducts = [
  {
    nama_barang: "Converse Chuck Taylor Big Logo",
    ukuran: "43 EU",
    kondisi: "Bekas, mulus",
    brand: "Converse",
    kategori: "Sepatu",
    deskripsi: "Converse klasik warna hitam, jarang dipakai, nyaman untuk aktivitas sehari-hari.",
    harga: "Rp 500.000",
    bahan: "Canvas",
    kontak_penjual: "081212398765",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/KYraId6.jpeg"
  },
  {
    nama_barang: "Nike Air Force One",
    ukuran: "43 U",
    kondisi: "Sangat baik",
    brand: "Nike",
    kategori: "Sepatu",
    deskripsi: "Sepatu Nike Air Force One klasik warna putih, ukuran 43 unisex. Kondisi sangat baik, hanya dipakai beberapa kali.",
    harga: "Rp 800.000",
    bahan: "Kulit Sintetis",
    kontak_penjual: "081298765432",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/QkRdALP.jpeg"
  },
  {
    nama_barang: "Hoodie Serpa Uniqlo",
    ukuran: "L",
    kondisi: "Sangat baik",
    brand: "Uniqlo",
    kategori: "Jaket",
    deskripsi: "Hoodie Uniqlo original, warna netral, nyaman dipakai, kondisi sangat baik, jarang digunakan.",
    harga: "Rp 190.000",
    bahan: "Cotton Blend",
    kontak_penjual: "081234567890",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/Ja0PDwB.jpeg"
  },
  {
    nama_barang: "Zipper Hoodie Harvard",
    ukuran: "L",
    kondisi: "Sangat baik",
    brand: "JanSport",
    kategori: "Jaket",
    deskripsi: "Hoodie Harvard dari JanSport, kondisi sangat baik, nyaman dipakai, jarang digunakan.",
    harga: "Rp 170.000",
    bahan: "Cotton Blend",
    kontak_penjual: "081234567890",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/OqssjWz.jpeg"
  },
  {
    nama_barang: "Longchamp Le Pliage Floral LLH Tote",
    ukuran: "One size",
    kondisi: "Baik",
    brand: "Longchamp",
    kategori: "Tas",
    deskripsi: "Tas Longchamp Le Pliage model Floral LLH Tote, kondisi baik, ringan dan praktis untuk aktivitas sehari-hari.",
    harga: "Rp 600.000",
    bahan: "Nylon & Leather",
    kontak_penjual: "081234567890",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/JXtUWPN.jpeg"
  },
  {
    nama_barang: "Adidas Samba OG Black White",
    ukuran: "EU41",
    kondisi: "Sangat baik",
    brand: "Adidas",
    kategori: "Sepatu",
    deskripsi: "Sneakers Adidas Samba OG warna hitam putih, kondisi sangat baik, jarang dipakai, desain klasik.",
    harga: "Rp 400.000",
    bahan: "Leather & Rubber",
    kontak_penjual: "081234567890",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/x2o1MXm.jpeg"
  },
  {
    nama_barang: "Uniqlo Corduroy Baggy Pants",
    ukuran: "M",
    kondisi: "Baru tanpa tag",
    brand: "Uniqlo",
    kategori: "Celana",
    deskripsi: "Celana corduroy model baggy dari Uniqlo, kondisi baru tanpa tag, nyaman dipakai.",
    harga: "Rp 171.000",
    bahan: "Corduroy",
    kontak_penjual: "081234567890",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/qLsCMGh.jpeg"
  },
  {
    nama_barang: "Kemeja Colorbox",
    ukuran: "M",
    kondisi: "Sangat baik",
    brand: "Colorbox",
    kategori: "Kemeja",
    deskripsi: "Kemeja Colorbox ukuran M, kondisi sangat baik, nyaman dipakai.",
    harga: "Rp 50.000",
    bahan: "Cotton",
    kontak_penjual: "081234567890",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/67dtG7z.jpeg"
  },
  {
    nama_barang: "Topi Nike Golf",
    ukuran: "One size",
    kondisi: "Sangat baik",
    brand: "Nike",
    kategori: "Aksesoris",
    deskripsi: "Topi Nike Golf, kondisi sangat baik, nyaman dipakai, cocok untuk olahraga dan aktivitas outdoor.",
    harga: "Rp 150.000",
    bahan: "Polyester",
    kontak_penjual: "081234567890",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/8M6oMcS.jpeg"
  },
  {
    nama_barang: "T-Shirt UT Uniqlo Aladdin Size S",
    ukuran: "S",
    kondisi: "Sangat baik",
    brand: "Uniqlo",
    kategori: "Kaos",
    deskripsi: "Kaos Uniqlo UT edisi Aladdin, ukuran S, kondisi sangat baik, nyaman dipakai.",
    harga: "Rp 95.000",
    bahan: "Cotton",
    kontak_penjual: "081234567890",
    lokasi: "Jakarta",
    link_gambar: "https://i.imgur.com/WRWUtJh.jpeg"
  }
];

// Seed Function
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Delete existing data
    console.log('🗑️  Menghapus data lama...');
    await Product.deleteMany({});
    console.log('✅ Data lama berhasil dihapus');

    // Insert sample data
    console.log('📝 Memasukkan data baru...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ ${products.length} produk berhasil ditambahkan`);

    // Display summary
    console.log('\n📊 Summary:');
    console.log('=====================================');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.nama_barang} - ${product.harga}`);
    });
    console.log('=====================================');
    console.log('\n✨ Seeding completed successfully!');
    console.log('🚀 Jalankan server dengan: npm run dev');

    // Close connection
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();