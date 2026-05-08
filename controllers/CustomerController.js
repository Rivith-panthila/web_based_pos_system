import { addCustomerData, getAllCustomers } from "../model/CustomerModel.js";

const customerForm = $('#customerForm');
const customerModalTitle = $('#customerModalTitle');
const saveCustomerBtn = $('#saveCustomerBtn');
const customerModal = new bootstrap.Modal($('#customerModal')[0]); 

$('#addCustomerBtn').on('click', function () {
    customerForm[0].reset();                        
    $('#customerId').attr('readonly', false);       
    customerModalTitle.text("Add Customer");
    saveCustomerBtn.text("Save Customer");
    customerModal.show();
});

$('#customerTable').on('click', '.cust-edit-action', function () {
    let row = $(this).closest('tr');
    let id      = row.find('td').eq(0).text();
    let name    = row.find('td').eq(1).text();
    let contact = row.find('td').eq(2).text();
    let address = row.find('td').eq(3).text();

    $('#customerId').val(id);
    $('#customerName').val(name);
    $('#customerContact').val(contact);
    $('#customerAddress').val(address);

    $('#customerId').attr('readonly', true);
    customerModalTitle.text("Edit Customer");
    saveCustomerBtn.text("Update Customer");
    customerModal.show();
});

saveCustomerBtn.on('click', function () {
    let id      = $('#customerId').val().trim();
    let name    = $('#customerName').val().trim();
    let contact = $('#customerContact').val().trim();
    let address = $('#customerAddress').val().trim();

    if (id && name && contact && address) {
        if (saveCustomerBtn.text() === "Save Customer") {   
            addCustomerData(id, name, contact, address);
        } else if (saveCustomerBtn.text() === "Update Customer") {
   
        }
        $('#customerId').attr('readonly', false);           
        customerModal.hide();                               
    } else {
        alert("Please fill in all fields.");                
    }
});