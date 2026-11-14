import Food from '../models/Food.js';
import Restaurant from '../models/Restaurant.js';

export async function listFoods(req, res, next) {
  try {
    const filter = { isAvailable: true };
    if (req.query.restaurant) filter.restaurant = req.query.restaurant;
    if (req.query.category) filter.category = new RegExp(req.query.category, 'i');
    if (req.query.search) filter.name = new RegExp(req.query.search, 'i');
    const foods = await Food.find(filter).populate('restaurant', 'name deliveryFee deliveryTime').sort({ createdAt: -1 });
    res.json({ foods });
  } catch (err) { next(err); }
}

export async function createFood(req, res, next) {
  try {
    const { name, price, restaurant } = req.body;
    if (!name || !price || !restaurant) return res.status(400).json({ message: 'Name, price and restaurant are required.' });
    const parent = await Restaurant.findById(restaurant);
    if (!parent) return res.status(404).json({ message: 'Restaurant not found.' });
    if (req.user.role !== 'admin' && String(parent.owner) !== String(req.user._id)) return res.status(403).json({ message: 'You cannot edit this restaurant menu.' });
    const food = await Food.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ food });
  } catch (err) { next(err); }
}

export async function updateFood(req, res, next) {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant');
    if (!food) return res.status(404).json({ message: 'Food item not found.' });
    if (req.user.role !== 'admin' && String(food.restaurant.owner) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed.' });
    Object.assign(food, req.body);
    await food.save();
    res.json({ food });
  } catch (err) { next(err); }
}

export async function deleteFood(req, res, next) {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant');
    if (!food) return res.status(404).json({ message: 'Food item not found.' });
    if (req.user.role !== 'admin' && String(food.restaurant.owner) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed.' });
    await food.deleteOne();
    res.json({ message: 'Food item deleted.' });
  } catch (err) { next(err); }
}
