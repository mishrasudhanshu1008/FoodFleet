import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  cuisine: { type: String, default: 'Multi-cuisine' },
  image: { type: String, default: '' },
  address: { type: String, required: true },
  city: { type: String, default: '' },
  deliveryTime: { type: String, default: '30-40 min' },
  deliveryFee: { type: Number, default: 30, min: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isOpen: { type: Boolean, default: true },
  rating: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true });

export default mongoose.model('Restaurant', restaurantSchema);
