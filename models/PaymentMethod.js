import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  active: { type: Boolean, default: true }
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;
