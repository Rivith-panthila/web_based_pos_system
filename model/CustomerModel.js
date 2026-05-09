import { customer_db } from '../db/db.js';

class Customer {
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

    // දත්ත පිටතට ලබා දීම සඳහා (Controller එකේ loadCustomers ට අවශ්‍යයි)
    getDetails() {
        return {
            id: this.#id,
            name: this.#name,
            contact: this.#contact,
            address: this.#address
        };
    }

    getId(){
        return this.#id;
    }

    getName(){
        return this.#name;
    }

    getContact(){
        return this.#contact;
    }

    getAddress(){
        return this.#address;
    }

    setId(id){
        this.#id=id;
    }

    setName(name){
        this.#name=name;
    }

    setContact(contact){
        this.#contact=contact;
    }

    setAddress(address){
        this.#address=address;
    }
}

const addCustomerData = (id, name, contact, address) => {
    // Class name එක Customer (Capital) නිසා මෙතන ප්‍රශ්නයක් වෙන්නේ නැහැ
    const newCustomer = new Customer(id, name, contact, address);
    customer_db.unshift(newCustomer);
}

const getAllCustomers = () => {
    // Private fields (#) කෙලින්ම පේන්නේ නැති නිසා detail objects විදිහට return කරනවා
    return customer_db.map(c => c.getDetails());
}

const updateCustomer = (id, name, contact, address) => {
    let obj=customer_db.find(item => item.getId() === id);
    if (obj) {
        obj.setName(name);
        obj.setContact(contact);
        obj.setAddress(address);
    }
}

const deleteCustomer = (id) => {
    // item.id වෙනුවට item.getId() පාවිච්චි කරන්න
    let index = customer_db.findIndex(item => item.getId() === id);
    
    if (index !== -1) {
        customer_db.splice(index, 1);
        console.log("Deleted customer index: " + index);
        return true;
    }
    console.log("Customer not found for ID: " + id);
    return false;
}
    

export { addCustomerData, getAllCustomers, updateCustomer, deleteCustomer };