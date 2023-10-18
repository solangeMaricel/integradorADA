import { Router } from 'express';
import OrderController from '../controllers/order-controller';
export const orderRouter = Router();


// app.use('/api/orders')

orderRouter.post('/create',  OrderController.createOrder);