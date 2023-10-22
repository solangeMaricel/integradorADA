import { number } from "zod";
import menu from "../databases/menu.json";
import { writeFile } from "jsonfile";
abstract class MenuModel {
  private static async findById(id: number) {
    return menu.find((item) => item.id == id);
  }
  private static async writeDB() {
    return writeFile("./src/databases/menu.json", menu);
  }
  static async getAll() {
    return menu;
  }
  static async editMenu(productData: any) {
    const { id, category, product, price } = productData;
    const foundItem = await this.findById(id);
    if (!foundItem) return 404;
    if (category) foundItem.category = category;
    if (product) foundItem.product = product;
    if (price) foundItem.price = price;
    this.writeDB();
    return foundItem;
  }
  static async addProduct(productData: any) {
    const { category, product, price } = productData;
    const id = menu.length + 1;
    menu.push({
      id,
      category,
      product,
      price,
    });
    return {
      id,
      category,
      product,
      price,
    };
  }

  static async deleteProduct(id: string) {
    const productIndex = menu.findIndex((product) => product.id == Number(id));
    if (productIndex === -1) return 404;
    const deletedProduct = menu[productIndex];
    menu.splice(productIndex, 1);
    this.writeDB();
    return deletedProduct;
  }
}

export default MenuModel;
