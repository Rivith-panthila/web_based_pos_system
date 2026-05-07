import{customer_db} from '../db/db.js';

class customer{
    #id;
    #name;
    #contact;
    #Address;

    constructor(id,name,contact,address){
        this.#id=id;
        this.#name=name;
        this.#contact=contact;
        this.#Address=address;
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
        return this.#Address;
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
        this.#Address=address;
    }

}

const addCustomerData=(id,name,contact,address)=>{
    const customer=new customer(id,name,contact,address);
    customer_db.unshift(customer);
    
}

const getAllCustomers=()=>{
    return customer_db;
}


export{addCustomerData,getAllCustomers}