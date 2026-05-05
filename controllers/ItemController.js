// Basic Item Controller
class ItemController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Add item button
        $('#addItemBtn').on('click', () => this.showAddForm());
        
        // Save item button
        $('#saveItemBtn').on('click', () => this.saveItem());
        
        // Item form
        $('#itemForm').on('submit', (e) => {
            e.preventDefault();
            this.saveItem();
        });
        
        // Dynamic events for item table
        $(document).on('click', '.edit-item', (e) => {
            const id = $(e.currentTarget).data('id');
            this.editItem(id);
        });
        
        $(document).on('click', '.delete-item', (e) => {
            const id = $(e.currentTarget).data('id');
            this.deleteItem(id);
        });
    }
    
    showAddForm() {
        $('#itemModal').modal('show');
    }
    
    saveItem() {
        const code = $('#itemCode').val().trim();
        const name = $('#itemName').val().trim();
        const price = parseFloat($('#itemPrice').val());
        const quantity = parseInt($('#itemQuantity').val());
        
        if (!code || !name || isNaN(price) || isNaN(quantity)) {
            this.showError('Please fill all fields correctly');
            return;
        }
        
        if (price < 0 || quantity < 0) {
            this.showError('Price and quantity must be positive');
            return;
        }
        
        this.model.addItem({ code, name, price, quantity });
        this.view.renderItemsTable();
        $('#itemModal').modal('hide');
        $('#itemForm')[0].reset();
        this.showSuccess('Item added successfully!');
    }
    
    editItem(id) {
        const item = this.model.getItem(id);
        if (item) {
            $('#itemCode').val(item.code);
            $('#itemName').val(item.name);
            $('#itemPrice').val(item.price);
            $('#itemQuantity').val(item.quantity);
            $('#itemModal').modal('show');
        }
    }
    
    deleteItem(id) {
        if (confirm('Are you sure?')) {
            this.model.deleteItem(id);
            this.view.renderItemsTable();
            this.showSuccess('Item deleted successfully!');
        }
    }
    
    showSuccess(message) {
        alert(message);
    }
    
    showError(message) {
        alert(message);
    }
}
