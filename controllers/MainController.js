// Basic Main Controller
class MainController {
    constructor() {
        this.model = POSModel;
        this.view = POSView;
        this.controllers = {};
        this.init();
    }
    
    init() {
        this.initializeControllers();
        this.bindEvents();
        this.loadSampleData();
        this.showLogin();
    }
    
    initializeControllers() {
        this.controllers.auth = new AuthController(this.model, this.view);
        this.controllers.customer = new CustomerController(this.model, this.view);
        this.controllers.item = new ItemController(this.model, this.view);
        this.controllers.order = new OrderController(this.model, this.view);
    }
    
    bindEvents() {
        // Navigation
        $('.nav-link[data-section]').on('click', (e) => {
            e.preventDefault();
            const section = $(e.currentTarget).data('section');
            this.showSection(section);
        });
    }
    
    showSection(sectionName) {
        this.view.showSection(sectionName);
        this.loadSectionData(sectionName);
    }
    
    loadSectionData(sectionName) {
        switch(sectionName) {
            case 'dashboard':
                this.view.updateDashboard();
                break;
            case 'customers':
                this.view.renderCustomersTable();
                this.view.populateCustomerSelect();
                break;
            case 'items':
                this.view.renderItemsTable();
                this.view.populateItemSelect();
                break;
            case 'orders':
                this.view.renderOrderItemsTable(this.controllers.order.currentOrderItems);
                this.view.renderAvailableItemsTable();
                this.view.populateCustomerSelect();
                this.view.populateItemSelect();
                break;
            case 'orderHistory':
                this.view.renderOrderHistoryTable();
                break;
        }
    }
    
    showLogin() {
        this.view.showLogin();
    }
    
    loadSampleData() {
        // Add sample customers
        this.model.addCustomer({
            name: 'John Doe',
            contact: '123-456-7890',
            address: '123 Main St'
        });
        
        this.model.addCustomer({
            name: 'Jane Smith',
            contact: '987-654-3210',
            address: '456 Oak Ave'
        });
        
        // Add sample items
        this.model.addItem({
            code: 'ITEM001',
            name: 'Laptop',
            price: 999.99,
            quantity: 10
        });
        
        this.model.addItem({
            code: 'ITEM002',
            name: 'Mouse',
            price: 25.99,
            quantity: 50
        });
        
        this.model.addItem({
            code: 'ITEM003',
            name: 'Keyboard',
            price: 79.99,
            quantity: 30
        });
    }
}
