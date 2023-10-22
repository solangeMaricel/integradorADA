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

  static async addItemOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { idProduct, amount } = req.body;
    const details = await OrderModel.addItemOrder({ id, idProduct, amount });
    if (details === 404)
      res.status(404).json({ message: "Error product or order not found" });
    res
      .status(200)
      .json({ message: "Order details added correctly", order: details });
  }

  static async createTicket(req: Request, res: Response) {
    const { id } = req.params;
    const ticket = await OrderModel.createTicket(Number(id));
    if (ticket === 404)
      res.status(404).json({
        message: "Order not found or customer didn't consumed any food yet",
      });
    res
      .status(200)
      .json({ message: "Ticket created successfully", ticket: ticket });
  }

  static async editOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { username, orderType, description } = req.body;
    const updatedOrder = await OrderModel.editOrder({
      id,
      username,
      orderType,
      description,
    });
    if (updatedOrder === 404)
      res.status(404).json({ message: "Order not found in systems" });
    res
      .status(200)
      .json({ message: "Order Updated successfully", order: updatedOrder });
  }

  static async editProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { idProduct, quantity } = req.body;
    const updatedProduct = await OrderModel.editProduct({
      id,
      idProduct,
      quantity,
    });
    if (updatedProduct === 404)
      return res
        .status(404)
        .json({ message: "Error, order or product not found" });
    res.status(200).json({
      message: "Order details updated successfully",
      updatedOrder: updatedProduct,
    });
  }
  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { idProduct } = req.body;
    const deletedProduct = await OrderModel.deleteProduct({ id, idProduct });
    if (deletedProduct === 404)
      return res.status(404).json({ message: "Order or product not found" });
    res.status(200).json({
      message: "Product delted successfully",
      deletedProduct: deletedProduct,
    });
  }
}

export default OrderController;
