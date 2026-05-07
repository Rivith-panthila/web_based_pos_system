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


saveCustomerBtn.on('click',function(){
    let id=$('#customerId').val();
    let name=$('#customerName').val();
    let contact=$('#customerContact').val();
    let address=$('#customerAddress').val();
    
})