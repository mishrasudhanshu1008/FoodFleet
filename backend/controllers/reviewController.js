import Review from '../models/Review.js';
import Order from '../models/Order.js';

export async function createReview(req, res, next) {
  try {
    const { orderId, rating, comment } = req.body;
    const order = await Order.findOne({ _id: orderId, customer: req.user._id, status: 'delivered' });
    if (!order) return res.status(400).json({ message: 'You can review only your delivered orders.' });
    const review = await Review.create({ customer: req.user._id, restaurant: order.restaurant, order: order._id, rating, comment });
    res.status(201).json({ review });
  } catch (err) { next(err); }
}
