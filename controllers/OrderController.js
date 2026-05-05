// Basic Order Controller
class OrderController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentOrderItems = [];
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Add item to order button
        $('#addItemToOrderBtn').on('click', () => this.showAddItemForm());
        
        // Place order button
        $('#placeOrderBtn').on('click', () => this.placeOrder());
        
        // Add item to order form
        $('#saveOrderItemBtn').on('click', () => this.addItemToOrder());
        
        // Dynamic events for order items
        $(document).on('change', '.order-item-quantity', (e) => {
            this.updateQuantity($(e.currentTarget));
        });
        
        $(document).on('click', '.remove-order-item', (e) => {
            this.removeItem($(e.currentTarget));
        });
    }
    
    showAddItemForm() {
        this.view.populateItemSelect();
        const modal = new bootstrap.Modal(document.getElementById('addItemModal'));
        modal.show();
    }
    
    addItemToOrder() {
        const itemId = $('#orderItemSelect').val();
        const quantity = parseInt($('#orderItemQuantity').val());
        
        if (!itemId || !quantity) {
            this.showError('Please select item and quantity');
            return;
        }
        
        const item = this.model.getItem(itemId);
        if (!item) {
            this.showError('Item not found');
            return;
        }
        
        if (quantity > item.quantity) {
            this.showError('Not enough stock');
            return;
        }
        
        // Add to order
        this.currentOrderItems.push({
            itemId: item.id,
            name: item.name,
            price: item.price,
            quantity: quantity
        });
        
        this.updateOrderDisplay();
        this.showSuccess('Item added to order');
    }
    
    updateQuantity(input) {
        const index = parseInt(input.data('index'));
        const newQuantity = parseInt(input.val());
        
        if (newQuantity < 1) {
            this.showError('Quantity must be at least 1');
            input.val(this.currentOrderItems[index].quantity);
            return;
        }
        
        this.currentOrderItems[index].quantity = newQuantity;
        this.updateOrderDisplay();
    }
    
    removeItem(button) {
        const index = parseInt(button.data('index'));
        this.currentOrderItems.splice(index, 1);
        this.updateOrderDisplay();
        this.showSuccess('Item removed from order');
    }
    
    updateOrderDisplay() {
        this.view.renderOrderItemsTable(this.currentOrderItems);
        this.updateTotal();
    }
    
    updateTotal() {
        const total = this.currentOrderItems.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);
        $('#orderTotal').text(total.toFixed(2));
    }
    
    placeOrder() {
        const customerId = $('#orderCustomer').val();
        
        if (!customerId) {
            this.showError('Please select a customer');
            return;
        }
        
        if (this.currentOrderItems.length === 0) {
            this.showError('Please add items to order');
            return;
        }
        
        const total = this.currentOrderItems.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);
        
        const orderData = {
            customerId: customerId,
            items: this.currentOrderItems,
            total: total
        };
        
        this.model.createOrder(orderData);
        this.currentOrderItems = [];
        this.updateOrderDisplay();
        $('#orderCustomer').val('');
        this.showSuccess('Order placed successfully!');
    }
    
    showSuccess(message) {
        alert(message);
    }
    
    showError(message) {
        alert(message);
    }
}
