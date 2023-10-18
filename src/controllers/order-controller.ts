import { Request, Response } from "express";
import OrderModel from "../models/order-model";
import { orderRouter } from "../routes/order-router";

abstract class OrderController {
    static async createOrder(req: Request, res: Response) {

        const newOrder = await OrderModel.createOrder(req.body);

        res
        .status(201)
        .json({ message: "Order created successully", order: newOrder });
      
    }
}

export default OrderController;