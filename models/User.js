import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  document_type: { type: String, enum: ['cc', 'ce', 'pe'], required: true },
  document_number: { type: Number, required: true },
  phone: { type: Number, required: true },
  place: [{
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    zip_code: { type: String, required: true }
  }],
  user_type: { type: String, enum: ['Comprador', 'Vendedor', 'Admin'], required: true },
  register_date: { type: Date, required: true },
  active: { type: Boolean, default: true }
});

const User = mongoose.model("User", userSchema);

export default User;
