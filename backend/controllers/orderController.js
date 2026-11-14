import Order from '../models/Order.js';
import Food from '../models/Food.js';
import Restaurant from '../models/Restaurant.js';

export async function createOrder(req, res, next) {
  try {
    const { items, deliveryAddress, phone, paymentMethod = 'cod' } = req.body;
    if (!Array.isArray(items) || !items.length || !deliveryAddress || !phone) {
      return res.status(400).json({ message: 'Cart items, delivery address and phone are required.' });
    }
    const ids = items.map(i => i.food);
    const foods = await Food.find({ _id: { $in: ids }, isAvailable: true });
    if (foods.length !== items.length) return res.status(400).json({ message: 'One or more food items are unavailable.' });

    const restaurantIds = [...new Set(foods.map(f => String(f.restaurant)))];
    if (restaurantIds.length !== 1) return res.status(400).json({ message: 'Please order from one restaurant at a time.' });

    const restaurant = await Restaurant.findById(restaurantIds[0]);
    if (!restaurant || !restaurant.isOpen) return res.status(400).json({ message: 'Restaurant is currently closed.' });

    const orderItems = items.map(item => {
      const food = foods.find(f => String(f._id) === String(item.food));
      const quantity = Math.max(1, Math.min(20, Number(item.quantity) || 1));
      return { food: food._id, name: food.name, price: food.price, quantity, image: food.image };
    });
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = restaurant.deliveryFee || 0;
    const order = await Order.create({
      customer: req.user._id, restaurant: restaurant._id, items: orderItems,
      deliveryAddress, phone, subtotal, deliveryFee, total: subtotal + deliveryFee,
      paymentMethod: paymentMethod === 'cod' ? 'cod' : 'cod'
    });
    res.status(201).json({ order });
  } catch (err) { next(err); }
}

export async function myOrders(req, res, next) {
  try {
    const orders = await Order.find({ customer: req.user._id }).populate('restaurant', 'name').populate('deliveryPartner', 'name phone').sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) { next(err); }
}

export async function listOrders(req, res, next) {
  try {
    let filter = {};
    if (req.user.role === 'delivery') filter.deliveryPartner = req.user._id;
    if (req.user.role === 'restaurant') {
      const restaurants = await Restaurant.find({ owner: req.user._id }).select('_id');
      filter.restaurant = { $in: restaurants.map(r => r._id) };
    }
    const orders = await Order.find(filter).populate('customer', 'name phone').populate('restaurant', 'name owner').populate('deliveryPartner', 'name phone').sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) { next(err); }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const allowed = ['accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid order status.' });
    const order = await Order.findById(req.params.id).populate('restaurant');
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.role === 'restaurant' && String(order.restaurant.owner) === String(req.user._id);
    const isAssignedDelivery = req.user.role === 'delivery' && String(order.deliveryPartner) === String(req.user._id);
    if (!isAdmin && !isOwner && !isAssignedDelivery) return res.status(403).json({ message: 'Not allowed to update this order.' });
    order.status = req.body.status;
    await order.save();
    res.json({ order });
  } catch (err) { next(err); }
}

export async function assignDelivery(req, res, next) {
  try {
    const { deliveryPartnerId } = req.body;
    const partner = await (await import('../models/User.js')).default.findOne({ _id: deliveryPartnerId, role: 'delivery', isActive: true });
    if (!partner) return res.status(404).json({ message: 'Active delivery partner not found.' });
    const order = await Order.findByIdAndUpdate(req.params.id, { deliveryPartner: partner._id }, { new: true }).populate('deliveryPartner', 'name phone');
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch (err) { next(err); }
}
