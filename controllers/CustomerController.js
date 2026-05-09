import { addCustomerData, getAllCustomers ,updateCustomer,deleteCustomer} from "../model/CustomerModel.js";

const customerForm = $('#customerForm');
const customerModalTitle = $('#customerModalTitle');
const saveCustomerBtn = $('#saveCustomerBtn');
const customerModal = new bootstrap.Modal($('#customerModal')[0]); 

function loadCustomers(data) {
    $('#customer_tbody').empty();
    let customerList;
    if(data==undefined){
        customerList = getAllCustomers();
    }else{
        customerList = data;
    }

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
   
            updateCustomer(id, name, contact, address);
        }
        $('#customerId').attr('readonly', false);           
        customerModal.hide(); 
        loadCustomers();                              
    } else {
        alert("Please fill in all fields.");                
    }


});


$('#customerTable').on('click', '.cust-delete-action', function () {
    let id = $(this).closest('tr').find('td:eq(0)').text();
    deleteCustomer(id);
    loadCustomers();
});


loadCustomers();

