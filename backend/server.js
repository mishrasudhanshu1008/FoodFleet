import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => res.json({ success: true, message: 'Welcome to FoodFleet API' }));
app.get('/api/health', (req, res) => res.json({ success: true, message: 'FoodFleet backend is running' }));

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
try {
  await connectDB();
  app.listen(PORT, () => console.log(`FoodFleet API running on port ${PORT}`));
} catch (error) {
  console.error(`Startup failed: ${error.message}`);
  process.exit(1);
}
