import { Router } from 'express';
import { listFoods, createFood, updateFood, deleteFood } from '../controllers/foodController.js';
import { protect, allowRoles } from '../middleware/auth.js';
const router = Router();
router.get('/', listFoods);
router.post('/', protect, allowRoles('admin', 'restaurant'), createFood);
router.put('/:id', protect, allowRoles('admin', 'restaurant'), updateFood);
router.delete('/:id', protect, allowRoles('admin', 'restaurant'), deleteFood);
export default router;
