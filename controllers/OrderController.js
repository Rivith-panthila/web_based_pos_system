import {
    addOrder,
    getAllOrders
} from "../model/OrderModel.js";

import { getAllCustomers } from "../model/CustomerModel.js";
import { getAllItems } from "../model/ItemModel.js";



const addItemModal = new bootstrap.Modal($('#addItemModal')[0]);

let orderItems = [];

// Load Customers to Select Box
function loadCustomerSelect() {

    $('#orderCustomer').empty();

    $('#orderCustomer').append(`
        <option value="">Choose a customer...</option>
    `);

    const customers = getAllCustomers();

    customers.forEach(customer => {

        $('#orderCustomer').append(`
            <option value="${customer.id}">
                ${customer.name}
            </option>
        `);

    });

}

// Load Items to Modal Select Box
function loadItemSelect() {

    $('#orderItemSelect').empty();

    $('#orderItemSelect').append(`
        <option value="">Choose an item...</option>
    `);

    const items = getAllItems();

    items.forEach(item => {

        $('#orderItemSelect').append(`
            <option value="${item.code}">
                ${item.name} - RS ${item.price}
            </option>
        `);

    });

}

// Available Items Table
function loadAvailableItems() {

    $('#availableItemsTable tbody').empty();

    const items = getAllItems();

    items.forEach(item => {

        $('#availableItemsTable tbody').append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
            </tr>
        `);

    });

}

// Open Add Item Modal
$('#addItemToOrderBtn').on('click', function () {

    loadItemSelect();

    $('#orderItemQuantity').val(1);

    addItemModal.show();

});

// Save Order Item
$('#saveOrderItemBtn').on('click', function () {

    let itemCode = $('#orderItemSelect').val();

    let qty = parseInt($('#orderItemQuantity').val());

    if (!itemCode || qty <= 0) {

        alert("Select item and quantity");

        return;

    }

    const item = getAllItems().find(i => i.code === itemCode);

    if (!item) {
        alert("Item not found");
        return;
    }

    if (qty > item.quantity) {

        alert("Not enough stock!");

        return;

    }

    let subtotal = qty * item.price;

    orderItems.push({
        code: item.code,
        name: item.name,
        price: item.price,
        quantity: qty,
        subtotal: subtotal
    });

    loadOrderTable();

    addItemModal.hide();

});

// Load Order Table
function loadOrderTable() {

    $('#orderItemsTable tbody').empty();

    let total = 0;

    orderItems.forEach((item, index) => {

        total += item.subtotal;

        $('#orderItemsTable tbody').append(`
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.subtotal}</td>
                <td>
                    <button class="btn btn-danger btn-sm remove-order-item"
                        data-index="${index}">
                        Remove
                    </button>
                </td>
            </tr>
        `);

    });

    $('#orderTotal').text(total.toFixed(2));

}

// Remove Order Item
$('#orderItemsTable').on('click', '.remove-order-item', function () {

    let index = $(this).data('index');

    orderItems.splice(index, 1);

    loadOrderTable();

});

// Place Order
$('#placeOrderBtn').on('click', function () {

    let customerId = $('#orderCustomer').val();

    if (!customerId) {

        alert("Please select customer");

        return;

    }

    if (orderItems.length === 0) {

        alert("Please add items");

        return;

    }

    const customer = getAllCustomers().find(
        c => c.id === customerId
    );

    let total = orderItems.reduce(
        (sum, item) => sum + item.subtotal,
        0
    );

    addOrder(
        customer.id,
        customer.name,
        orderItems,
        total
    );

    alert("Order placed successfully!");

    orderItems = [];

    loadOrderTable();

    loadAvailableItems();

    loadOrderHistory();

});

// Load Order History
function loadOrderHistory() {

    $('#orderHistoryTable tbody').empty();

    const orders = getAllOrders();

    orders.forEach(order => {

        let itemCount = order.items.length;

        $('#orderHistoryTable tbody').append(`
            <tr>
                <td>${order.orderId}</td>
                <td>${order.customerName}</td>
                <td>${order.date}</td>
                <td>${itemCount}</td>
                <td>RS ${order.total}</td>
            </tr>
        `);

    });

}

// Initial Load
loadCustomerSelect();


loadOrderHistory();

loadAvailableItems();

export { loadCustomerSelect, loadAvailableItems };