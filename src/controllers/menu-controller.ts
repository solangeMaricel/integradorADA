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
      res.status(404).json({ message: "No se encontro el producto" });
    res.status(200).json({
      message: "Producto editado de manera existosa",
      product: editedProduct,
    });
  }

  static async addProduct(req: Request, res: Response) {
    const createdProduct = await MenuModel.addProduct(req.body);
    res.status(200).json({
      message: "Nuevo aproducto agregado de manera exitosa",
      product: createdProduct,
    });
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const deletedProduct = await MenuModel.deleteProduct(id);
    if (deletedProduct === 404)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({
      message: "Producto eliminado de manera exitossa",
      deletedProduct,
    });
  }
}
