import { addCustomerData,getAllCustomers}from "../model/CustomerModel.js";

const customerForm = $('#customerForm');
const customerModalTitle = $('#customerModalTitle');
const saveCustomerBtn = $('#saveCustomerBtn');
const customermodal=$('#customerModal');



$('addCustomerBtn').on('click',function(){
   customermodal.show();
   customerModalTitle.text("Add Customer");
   saveCustomerBtn.text("save Customer");
});

$('customerTable').on('click','.cust-edit-action',function(){
    let row=$(this).closets('tr');
    let id=row.find('td').eq(0).text();
    let name=row.find('td').eq(1).text();
    let contact=row.find('td').eq(2).text();
    let address=row.find('td').eq(3).text();

    $('#customerId').val(id);
    $('#customerName').val(name);
    $('#customerContact').val(contact);
    $('#customerAddress').val(address);
    
    customerModalTitle.text("Edit Customer");
    saveCustomerBtn.text("Update Customer");
    $('#customerId').attr('readonly',true);
    customermodal.show();
    
});

$('customerTable').on('click','.cust-delete-action',function(){
    
});






saveCustomerBtn.on('click',function(){
    let id=$('#customerId').val();
    let name=$('#customerName').val();
    let contact=$('#customerContact').val();
    let address=$('#customerAddress').val();
    $('customerId').attr('readonly',false);


    if(id!="" && name!="" && contact!="" && address!=""){

        if(saveCustomerBtn.text()=="save Customer"){
            addCustomerData(id,name,contact,address);
        }
    }
    
})