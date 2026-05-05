// Basic Customer Controller
class CustomerController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Add customer button
        $('#addCustomerBtn').on('click', () => this.showAddForm());
        
        // Save customer button
        $('#saveCustomerBtn').on('click', () => this.saveCustomer());
        
        // Customer form
        $('#customerForm').on('submit', (e) => {
            e.preventDefault();
            this.saveCustomer();
        });
        
        // Dynamic events for customer table
        $(document).on('click', '.edit-customer', (e) => {
            const id = $(e.currentTarget).data('id');
            this.editCustomer(id);
        });
        
        $(document).on('click', '.delete-customer', (e) => {
            const id = $(e.currentTarget).data('id');
            this.deleteCustomer(id);
        });
    }
    
    showAddForm() {
        $('#customerModal').modal('show');
    }
    
    saveCustomer() {
        const name = $('#customerName').val().trim();
        const contact = $('#customerContact').val().trim();
        const address = $('#customerAddress').val().trim();
        
        if (!name || !contact || !address) {
            this.showError('Please fill all fields');
            return;
        }
        
        this.model.addCustomer({ name, contact, address });
        this.view.renderCustomersTable();
        $('#customerModal').modal('hide');
        $('#customerForm')[0].reset();
        this.showSuccess('Customer added successfully!');
    }
    
    editCustomer(id) {
        const customer = this.model.getCustomer(id);
        if (customer) {
            $('#customerName').val(customer.name);
            $('#customerContact').val(customer.contact);
            $('#customerAddress').val(customer.address);
            $('#customerModal').modal('show');
        }
    }
    
    deleteCustomer(id) {
        if (confirm('Are you sure?')) {
            this.model.deleteCustomer(id);
            this.view.renderCustomersTable();
            this.showSuccess('Customer deleted successfully!');
        }
    }
    
    showSuccess(message) {
        alert(message);
    }
    
    showError(message) {
        alert(message);
    }
}
