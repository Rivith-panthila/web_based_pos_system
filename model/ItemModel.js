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

// 2. Get All Items
const getAllItems = () => {
    return item_db.map(item => item.getDetails());
};

// 3. Update Item
const updateItem = (code, name, price, quantity) => {
    let obj = item_db.find(item => item.getCode() === code);

    if (obj) {
        obj.setName(name);
        obj.setPrice(price);
        obj.setQuantity(quantity);
        return true;
    }

    return false;
};


// 4. Delete Item
const deleteItem = (code) => {
    let index = item_db.findIndex(item => item.getCode() === code);

    if (index !== -1) {
        item_db.splice(index, 1);
        return true;
    }

    return false;
};

// 5. Generate Next Item Code
const generateNextItemCode = () => {

    if (item_db.length === 0) {
        return "I001";
    }

    const codes = item_db.map(item =>
        parseInt(item.getCode().replace("I", ""))
    );

    const maxCode = Math.max(...codes);

    return "I" + (maxCode + 1).toString().padStart(3, '0');
};

export {
    addItemData,getAllItems, updateItem, deleteItem, generateNextItemCode
};

