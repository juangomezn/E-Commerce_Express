import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  date: { type: Date, required: true },
  paymentMethod: { type: mongoose.Types.ObjectId, ref: 'PaymentMethod', required: true },
  client: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  saledetails: [{
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }]
});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
