import { order_db } from '../db/db.js';

export const order_db = [];

class Order {
    #orderId;
    #customerId;
    #date;
    #items; // [{itemCode, name, qty, price, subtotal}]
    #total;

    constructor(orderId, customerId, date, items, total) {
        this.#orderId = orderId;
        this.#customerId = customerId;
        this.#date = date;
        this.#items = items;
        this.#total = total;
    }
    getDetails() {
        return {
            orderId: this.#orderId,
            customerId: this.#customerId,
            date: this.#date,
            items: this.#items,
            total: this.#total
        };
    }

    getOrderId() { return this.#orderId; }
}


const saveOrderData = (orderId, customerId, date, items, total) => {
    const newOrder = new Order(orderId, customerId, date, items, total);
    order_db.unshift(newOrder); // අලුත් order එක මුලටම දානවා
    return true;
};

const getAllOrders = () => {
    return order_db.map(order => order.getDetails());
};

const generateNextOrderId = () => {
    if (order_db.length === 0) return "OID-001";
    const ids = order_db.map(o => parseInt(o.getOrderId().replace("OID-", "")));
    const maxId = Math.max(...ids);
    return "OID-" + (maxId + 1).toString().padStart(3, '0');
};

export { saveOrderData, getAllOrders, generateNextOrderId };