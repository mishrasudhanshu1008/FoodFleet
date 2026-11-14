import { Router } from 'express';
import { createReview } from '../controllers/reviewController.js';
import { protect, allowRoles } from '../middleware/auth.js';
const router = Router();
router.post('/', protect, allowRoles('customer'), createReview);
export default router;
