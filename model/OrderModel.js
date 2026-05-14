import { order_db, item_db, customer_db } from "../db/db.js";

class Order {

    #orderId;
    #customerId;
    #customerName;
    #items;
    #total;
    #date;

    constructor(orderId, customerId, customerName, items, total, date) {

        this.#orderId = orderId;
        this.#customerId = customerId;
        this.#customerName = customerName;
        this.#items = items;
        this.#total = total;
        this.#date = date;

    }

    // Getters
    getOrderId() { return this.#orderId; }
    getCustomerId() { return this.#customerId; }
    getCustomerName() { return this.#customerName; }
    getItems() { return this.#items; }
    getTotal() { return this.#total; }
    getDate() { return this.#date; }

    // Object Return
    getDetails() {
        return {
            orderId: this.#orderId,
            customerId: this.#customerId,
            customerName: this.#customerName,
            items: this.#items,
            total: this.#total,
            date: this.#date
        };
    }

}

// Add Order
const addOrder = (customerId, customerName, items, total) => {

    let orderId = generateNextOrderId();

    let date = new Date().toLocaleDateString();

    const newOrder = new Order(
        orderId,
        customerId,
        customerName,
        items,
        total,
        date
    );

    order_db.unshift(newOrder);

    // Update Stock
    items.forEach(orderItem => {

        let itemObj = item_db.find(
            item => item.getCode() === orderItem.code
        );

        if (itemObj) {

            let currentQty = parseInt(itemObj.getQuantity());

            itemObj.setQuantity(currentQty - orderItem.quantity);

        }

    });

};

// Get All Orders
const getAllOrders = () => {

    return order_db.map(order => order.getDetails());

};

// Generate Order ID
const generateNextOrderId = () => {

    if (order_db.length === 0) {
        return "O001";
    }

    const ids = order_db.map(order =>
        parseInt(order.getOrderId().replace("O", ""))
    );

    const maxId = Math.max(...ids);

    return "O" + (maxId + 1).toString().padStart(3, '0');

};

export {
    addOrder,
    getAllOrders,
    generateNextOrderId
};