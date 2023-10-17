import users from '../databases/order.json';
import { writeFile } from 'jsonfile';
import { randomUUID } from 'node:crypto';

abstract class OrderModel {

    static async createOrder(orderData: any){

    }
}


export default OrderModel;