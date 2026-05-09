import { customer_db } from '../db/db.js';

class Customer {
    // Private properties
    #id;
    #name;
    #contact;
    #address;

    constructor(id, name, contact, address) {
        this.#id = id;
        this.#name = name;
        this.#contact = contact;
        this.#address = address;
    }

    // --- Getters ---
    getId() { return this.#id; }
    getName() { return this.#name; }
    getContact() { return this.#contact; }
    getAddress() { return this.#address; }

    // --- Setters ---
    setName(name) { this.#name = name; }
    setContact(contact) { this.#contact = contact; }
    setAddress(address) { this.#address = address; }

    // Table එකේ display කරන්න ලේසි වෙන්න Object එකක් ලෙස ලබා ගැනීම
    getDetails() {
        return {
            id: this.#id,
            name: this.#name,
            contact: this.#contact,
            address: this.#address
        };
    }
}

// 1. අලුත් Customer කෙනෙක් ඇතුළත් කිරීම
const addCustomerData = (id, name, contact, address) => {
    const newCustomer = new Customer(id, name, contact, address);
    customer_db.unshift(newCustomer); // අලුත් අයව Array එකේ මුලට එකතු කරයි
};

// 2. සියලුම දත්ත ලබා ගැනීම
const getAllCustomers = () => {
    return customer_db.map(c => c.getDetails());
};

// 3. දත්ත Update කිරීම
const updateCustomer = (id, name, contact, address) => {
    let obj = customer_db.find(item => item.getId() === id);
    if (obj) {
        obj.setName(name);
        obj.setContact(contact);
        obj.setAddress(address);
        return true;
    }
    return false;
};

// 4. දත්ත Delete කිරීම
const deleteCustomer = (id) => {
    let index = customer_db.findIndex(item => item.getId() === id);
    if (index !== -1) {
        customer_db.splice(index, 1);
        return true;
    }
    return false;
};

// 5. ඊළඟ ID එක Auto-Generate කිරීම
const generateNextId = () => {
    if (customer_db.length === 0) {
        return "C001";
    }
    // දැනට තියෙන ලොකුම ID අංකය සොයා ගැනීම
    const ids = customer_db.map(c => parseInt(c.getId().replace("C", "")));
    const maxId = Math.max(...ids);
    return "C" + (maxId + 1).toString().padStart(3, '0');
};

export { addCustomerData, getAllCustomers, updateCustomer, deleteCustomer, generateNextId };