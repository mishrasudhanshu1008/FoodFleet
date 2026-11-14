import { Router } from 'express';
import { listRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController.js';
import { protect, allowRoles } from '../middleware/auth.js';
const router = Router();
router.get('/', listRestaurants);
router.post('/', protect, allowRoles('admin', 'restaurant'), createRestaurant);
router.put('/:id', protect, allowRoles('admin', 'restaurant'), updateRestaurant);
router.delete('/:id', protect, allowRoles('admin', 'restaurant'), deleteRestaurant);
export default router;
