import { Router } from 'express';
import OrderController from '../controllers/order-controller';
export const orderRouter = Router();


// app.use('/api/orders')
// validar que este logueado -> user middleware( esperar a Sol)
//editar orden details ( eliminar o borrar producto)(Solange)
// editar orden en gral, cambio de mesa o cambio de camarero,  order type junto con description->direccion (Solange)
//zod ( a futuro, si lo quieren agarrar alguien bienvenida)
orderRouter.post('/create',  OrderController.createOrder);
orderRouter.post('/create/:id',OrderController.addItemOrder);
orderRouter.post('/close/:id',OrderController.createTicket)
