require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 API: http://localhost:${PORT}/api/products`);
    console.log('=================================');
  });
}

module.exports = app;