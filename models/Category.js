import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  active: { type: Boolean, default: true }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
