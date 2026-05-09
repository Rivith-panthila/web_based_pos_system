import { addCustomerData, getAllCustomers, updateCustomer, deleteCustomer, generateNextId } from "../model/CustomerModel.js";

const customerForm = $('#customerForm');
const customerModalTitle = $('#customerModalTitle');
const saveCustomerBtn = $('#saveCustomerBtn');
const customerModal = new bootstrap.Modal($('#customerModal')[0]); 

// Table එක Load කරන function එක
function loadCustomers() {
    $('#customer_tbody').empty();
    const customerList = getAllCustomers();

    customerList.forEach(customer => {
        $('#customer_tbody').append(`
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.contact}</td>
                <td>${customer.address}</td>
                <td>
                    <button class="btn btn-sm btn-primary cust-edit-action">Edit</button>
                    <button class="btn btn-sm btn-danger cust-delete-action">Delete</button>
                </td>
            </tr>
        `);
    });
}

// Add Customer Modal එක open කිරීම
$('#addCustomerBtn').on('click', function () {
    customerForm[0].reset();
    
    let nextId = generateNextId();
    $('#customerId').val(nextId).attr('readonly', true);
    
    customerModalTitle.text("Add Customer");
    saveCustomerBtn.text("Save Customer");
    customerModal.show();
});

// Edit Button (Table එකේ)
$('#customerTable').on('click', '.cust-edit-action', function () {
    let row = $(this).closest('tr');
    
    $('#customerId').val(row.find('td:eq(0)').text()).attr('readonly', true);
    $('#customerName').val(row.find('td:eq(1)').text());
    $('#customerContact').val(row.find('td:eq(2)').text());
    $('#customerAddress').val(row.find('td:eq(3)').text());

    customerModalTitle.text("Edit Customer");
    saveCustomerBtn.text("Update Customer");
    customerModal.show();
});

// Save හෝ Update Button එක
saveCustomerBtn.on('click', function () {
    let id      = $('#customerId').val();
    let name    = $('#customerName').val().trim();
    let contact = $('#customerContact').val().trim();
    let address = $('#customerAddress').val().trim();

    if (id && name && contact && address) {
        if (saveCustomerBtn.text() === "Save Customer") {   
            addCustomerData(id, name, contact, address);
        } else {
            updateCustomer(id, name, contact, address);
        }
        customerModal.hide(); 
        loadCustomers();
    } else {
        alert("Please fill in all fields.");
    }
});

// Delete Button
$('#customerTable').on('click', '.cust-delete-action', function () {
    let id = $(this).closest('tr').find('td:eq(0)').text();
    if (confirm("Are you sure you want to delete ID: " + id + "?")) {
        deleteCustomer(id);
        loadCustomers();
    }
});

$('#addCustomerBtn').on('click', function () {
    // Form එක reset කරනවා
    customerForm[0].reset();
    
    // Model එකෙන් අලුත් ID එක අරගෙන field එකට දානවා
    let nextId = generateNextId();
    $('#customerId').val(nextId).attr('readonly', true); 
    
    customerModalTitle.text("Add Customer");
    saveCustomerBtn.text("Save Customer");
    customerModal.show();
});

// මුලින්ම පටන් ගනිද්දී දත්ත Load කිරීම
loadCustomers();