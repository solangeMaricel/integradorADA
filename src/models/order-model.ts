import orders from "../databases/order.json";
import menu from "../databases/menu.json";
import { writeFile } from "jsonfile";
import { format } from "date-fns";

abstract class OrderModel {
  private static async findByIdProduct(idProduct: number) {
    const productFound = menu.find((product) => product.id == idProduct);
    return productFound;
  }

  private static async findByIdOrder(idOrder: number) {
    const orderFound = orders.find((order) => order.idOrder == idOrder);
    return orderFound;
  }

  private static async writeDB() {
    return writeFile("./src/databases/order.json", orders);
  }

  static async createOrder(orderData: any) {
    const { username, orderType, description } = orderData;

    const fechaActual = new Date();
    const fechaFormateada = format(fechaActual, "dd/MM/yyyy");

    const result = orders.push({
      idOrder: orders.length + 1,
      username,
      orderType,
      description,
      dateOrder: fechaFormateada,
      detail: [],
      totalOrder: 0,
    });

    await this.writeDB();

    return result;
  }

  static async addItemOrder(data: any) {
    const { id, idProduct, amount } = data;
    const dataProduct = await this.findByIdProduct(idProduct);
    const dataOrder = await this.findByIdOrder(id);

    if (!dataProduct) return 404;
    if (!dataOrder) return 404;

    dataOrder.detail.push({
      idProduct: idProduct,
      product: dataProduct.product,
      price: dataProduct.price,
      quantity: amount,
    });
    await this.writeDB();
    return dataOrder;
  }

  static async createTicket(orderId: number) {
    const dataOrder = await this.findByIdOrder(orderId);
    if (!dataOrder || dataOrder.detail.length == 0) return 404;

    let totalPrice = 0;
    const ticket = [];
    for (const prod of dataOrder.detail) {
      const { product, quantity, price } = prod;
      totalPrice += quantity * price;
      ticket.push({
        product: product,
        quantity: quantity,
        price: quantity * price,
      });
    }
    ticket.push({ totalPrice: totalPrice });
    dataOrder.totalOrder = totalPrice;
    await this.writeDB();
    return ticket;
  }

  static async editOrder(orderData: any) {
    const { id, username, orderType, description } = orderData;
    const dataOrder = await this.findByIdOrder(id);
    if (!dataOrder) return 404;

    if (username) dataOrder.username = username;
    if (orderType) dataOrder.orderType = orderType;
    if (description) dataOrder.description = description;
    this.writeDB();
    return dataOrder;
  }

  static async editProduct(productData: any) {
    const { id, idProduct, quantity } = productData;
    const dataOrder = await this.findByIdOrder(id);
    if (!dataOrder) return 404;
    const productToUpdate = dataOrder.detail.find(
      (product) => product.idProduct == idProduct
    );
    if (!productToUpdate) return 404;
    if (quantity) productToUpdate.quantity = quantity;
    this.writeDB();
    return productToUpdate;
  }
  static deleteProduct(productData: any) {
    const { id, idProduct } = productData;
    const orderIndex = orders.findIndex((order) => order.idOrder === id);
    if (!orderIndex) return 404;
    const order = orders[orderIndex];
    const productIndex = order.detail.findIndex(
      (product) => product.idProduct === idProduct
    );
    if (productIndex === -1) return 404;
    const deletedProduct = order.detail[productIndex];
    order.detail.splice(productIndex, 1);
    this.writeDB();
    return deletedProduct;
  }
}

export default OrderModel;
