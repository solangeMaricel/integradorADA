import { Request, Response } from "express";
import MenuModel from "../models/menu-model";

export default abstract class MenuController {
  static async getAll(req: Request, res: Response) {
    const menu = await MenuModel.getAll();
    res.json(menu);
  }
  static async editMenu(req: Request, res: Response) {
    const { id } = req.params;
    const { category, product, price } = req.body;
    const editedProduct = await MenuModel.editMenu({
      id,
      category,
      product,
      price,
    });
    if (editedProduct === 404)
      res.status(404).json({ message: "Product not found" });
    res
      .status(200)
      .json({ message: "Product edited successfully", product: editedProduct });
  }

  static async addProduct(req: Request, res: Response) {}
}
