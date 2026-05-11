import { getAllCustomers } from "./CustomerController.js"; 
import { getAllItems, updateItemStock } from "./ItemController.js"; // Stock update කිරීමට
import { saveOrderData, getAllOrders, generateNextOrderId } from "../model/OrderModel.js";

let cart = [];
function initializeOrderPage() {
    // Fill Customer Dropdown
    const customerSelect = $('#orderCustomer');
    customerSelect.empty().append('<option value="">Choose a customer...</option>');
    getAllCustomers().forEach(cust => {
        customerSelect.append(`<option value="${cust.id}">${cust.id} - ${cust.name}</option>`);
    });

    const itemSelect = $('#orderItemSelect');
    itemSelect.empty().append('<option value="">Choose an item...</option>');
    getAllItems().forEach(item => {
        itemSelect.append(`<option value="${item.code}">${item.name} (Qty: ${item.qty})</option>`);
    });

    loadAvailableItems();
}