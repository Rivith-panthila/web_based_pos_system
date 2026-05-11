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