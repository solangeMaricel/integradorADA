import { Router } from "express";
import OrderController from "../controllers/order-controller";
import authMiddleware from "../middlewares/auth";
export const orderRouter = Router();

//zod ( a futuro, si lo quieren agarrar alguien bienvenida)
orderRouter.post("/create", authMiddleware, OrderController.createOrder);
orderRouter.post("/create/:id", authMiddleware, OrderController.addItemOrder);
orderRouter.post("/close/:id", authMiddleware, OrderController.createTicket);
orderRouter.patch("/:id", authMiddleware, OrderController.editOrder);
orderRouter.patch("/details/:id", authMiddleware, OrderController.editProduct);
orderRouter.delete("':id", OrderController.deleteProduct);
