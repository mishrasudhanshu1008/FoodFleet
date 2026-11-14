import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'Popular' },
  price: { type: Number, required: true, min: 1 },
  image: { type: String, default: '' },
  isAvailable: { type: Boolean, default: true },
  isVeg: { type: Boolean, default: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Food', foodSchema);
