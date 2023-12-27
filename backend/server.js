import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 3002;

connectDB(); // Connect to MongoDB

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/products', productRoutes);

app.use(notFound); // 404 error handler
app.use(errorHandler); // Custom error handler

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
