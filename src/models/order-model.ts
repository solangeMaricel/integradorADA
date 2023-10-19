import orders from '../databases/order.json';
import menu from '../databases/menu.json';
import { writeFile } from 'jsonfile';
import { randomUUID } from 'node:crypto';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

abstract class OrderModel {

    private static async findByIdProduct(idProduct: number) {
        const productFound = menu.find(product => product.Id == idProduct); // [{}]
        return productFound;
    }

    private static async findByIdOrder(idOrder: number) {
        const orderFound = orders.find(order => order.idOrder == idOrder); // [{}]
        return orderFound;
    }

    private static async writeDB() {
        return writeFile('./src/databases/order.json', orders);
    }

    static async createOrder(orderData: any) {
        const { username, orderType, description } = orderData;

        const fechaActual = new Date();
        const fechaFormateada = format(fechaActual, 'dd/MM/yyyy');
    
        const result = orders.push({

            idOrder: orders.length + 1,
            username,
            orderType,
            description,
            dateOrder: fechaFormateada,
            detail: [],
            totalOrder: 0
        });

        await this.writeDB();

        return result;

    }

    static async addItemOrder(data: any){
        const {idOrder, idProduct, amount } =  data;
        const dataProduct = await this.findByIdProduct(idProduct); //{  "Id": 2, "category": "food", "product": "Pizza", "price": 2500 }
        const dataOrder = await this.findByIdOrder(idOrder);

        if (!dataProduct) return 404;
        if (!dataOrder) return 404;
        
        dataOrder.detail.push({idProduct:idProduct,product: dataProduct.product, price: dataProduct.price, quantity: amount});
        await this.writeDB();
        return dataOrder;

    }

    static async createTicket(orderId:number){
        const dataOrder= await this.findByIdOrder(orderId)
        if (!dataOrder || dataOrder.detail.length == 0) return 404;
        
        let totalPrice=0
        const ticket=[]
        for(const prod of dataOrder.detail){
            const {product, quantity, price}=prod
            totalPrice+=quantity*price
            ticket.push({product:product, quantity:quantity, price:quantity*price })
        }
        ticket.push({"totalPrice":totalPrice})
        dataOrder.totalOrder=totalPrice
        await this.writeDB()
        return ticket
        
    }
}



export default OrderModel;