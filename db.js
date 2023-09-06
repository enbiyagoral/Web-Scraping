const mongoose = require('mongoose');

// Ürün Şemasını Tanımla
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  productUrl: {
    type: String,
    
  },
  tecnicDetails: [
    {
      key: String,
      value: String,
    },
  ]
});

// Ürün Modelini Oluştur
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
