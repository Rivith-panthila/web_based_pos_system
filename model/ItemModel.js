import { item_db } from '../db/db.js';

class Item {

    // Private Properties
    #code;
    #name;
    #price;
    #quantity;

    constructor(code, name, price, quantity) {
        this.#code = code;
        this.#name = name;
        this.#price = price;
        this.#quantity = quantity;
    }

    // --- Getters ---
    getCode() { return this.#code; }
    getName() { return this.#name; }
    getPrice() { return this.#price; }
    getQuantity() { return this.#quantity; }

    // --- Setters ---
    setName(name) { this.#name = name; }
    setPrice(price) { this.#price = price; }
    setQuantity(quantity) { this.#quantity = quantity; }

    // Object එකක් විදියට return කරනවා
    getDetails() {
        return {
            code: this.#code,
            name: this.#name,
            price: this.#price,
            quantity: this.#quantity
        };
    }
}

// 1. Add Item
const addItemData = (code, name, price, quantity) => {
    const newItem = new Item(code, name, price, quantity);
    item_db.unshift(newItem);
};
