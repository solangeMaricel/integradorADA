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
}

export default MenuModel;
