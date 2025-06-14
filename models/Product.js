import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  code: String,
  name: String,
  description: String,
  images: String,
  price: Number,
  stock: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  brand: String,
  condition: {
    type: String,
    required: true,
    enum: ['new', 'used', 'refurbished']
  },
  vat: Number,
  active: Boolean
});

const Product = mongoose.model('Product', productSchema);
export default Product;
