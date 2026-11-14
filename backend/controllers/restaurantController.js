import Restaurant from '../models/Restaurant.js';

export async function listRestaurants(req, res, next) {
  try {
    const { search, city, cuisine } = req.query;
    const filter = {};
    if (city) filter.city = new RegExp(city, 'i');
    if (cuisine) filter.cuisine = new RegExp(cuisine, 'i');
    if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { cuisine: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }];
    const restaurants = await Restaurant.find(filter).populate('owner', 'name').sort({ createdAt: -1 });
    res.json({ restaurants });
  } catch (err) { next(err); }
}

export async function createRestaurant(req, res, next) {
  try {
    const { name, address } = req.body;
    if (!name || !address) return res.status(400).json({ message: 'Restaurant name and address are required.' });
    const restaurant = await Restaurant.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ restaurant });
  } catch (err) { next(err); }
}

export async function updateRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found.' });
    if (req.user.role !== 'admin' && String(restaurant.owner) !== String(req.user._id)) return res.status(403).json({ message: 'Not your restaurant.' });
    Object.assign(restaurant, req.body);
    await restaurant.save();
    res.json({ restaurant });
  } catch (err) { next(err); }
}

export async function deleteRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found.' });
    if (req.user.role !== 'admin' && String(restaurant.owner) !== String(req.user._id)) return res.status(403).json({ message: 'Not your restaurant.' });
    await restaurant.deleteOne();
    res.json({ message: 'Restaurant deleted.' });
  } catch (err) { next(err); }
}
