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

    static async addItemOrder(req:Request, res:Response){
        const details= await OrderModel.addItemOrder(req.body)
        if(details === 404) res.status(404).json({message:"Error product or order not found"})
        res.status(200).json({message:"Order details added correctly", order: details})
    }

    static async createTicket(req:Request, res:Response){
        const {id}=req.params
        const ticket = await OrderModel.createTicket(Number(id))
        if(ticket ===404) res.status(404).json({message:"Order not found or customer didn't consumed any food yet"})
        res.status(200).json({message:"Ticket created successfully", ticket:ticket})
    }
}

export default OrderController;