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
            name: 'Rivith Panthila',
            contact: '077-123-4567',
            address: '123 Colombo Street, Colombo'
        });
        
        this.model.addCustomer({
            name: 'Malith Bhagya',
            contact: '071-987-6543',
            address: '456 Kandy Road, Kandy'
        });
        
        this.model.addCustomer({
            name: 'Yasiru Lakshan',
            contact: '075-555-1234',
            address: '789 Galle Face, Colombo'
        });
        
        this.model.addCustomer({
            name: 'Nadeesha Perera',
            contact: '077-888-9999',
            address: '321 Marine Drive, Mount Lavinia'
        });
        
        // Add sample items
        this.model.addItem({
            code: 'ITEM001',
            name: 'Laptop Dell XPS',
            price: 150000.00,
            quantity: 15
        });
        
        this.model.addItem({
            code: 'ITEM002',
            name: 'Wireless Mouse',
            price: 2500.00,
            quantity: 50
        });
        
        this.model.addItem({
            code: 'ITEM003',
            name: 'Mechanical Keyboard',
            price: 8500.00,
            quantity: 30
        });
        
        this.model.addItem({
            code: 'ITEM004',
            name: 'USB-C Hub',
            price: 3500.00,
            quantity: 25
        });
        
        this.model.addItem({
            code: 'ITEM005',
            name: 'Monitor 24" LED',
            price: 45000.00,
            quantity: 20
        });
        
        this.model.addItem({
            code: 'ITEM006',
            name: 'Webcam HD',
            price: 6500.00,
            quantity: 35
        });
        
        this.model.addItem({
            code: 'ITEM007',
            name: 'Headphones Bluetooth',
            price: 12000.00,
            quantity: 40
        });
        
        this.model.addItem({
            code: 'ITEM008',
            name: 'External SSD 1TB',
            price: 18000.00,
            quantity: 22
        });
        
        this.model.addItem({
            code: 'ITEM009',
            name: 'Power Bank 20000mAh',
            price: 5500.00,
            quantity: 60
        });
        
        // Add sample orders
        const order1 = this.model.createOrder({
            customerId: 'CUST1696485123456789',
            items: [
                { itemId: 'ITEM1696485123456789', name: 'Laptop Dell XPS', price: 150000.00, quantity: 1 },
                { itemId: 'ITEM1696485123456790', name: 'Wireless Mouse', price: 2500.00, quantity: 1 }
            ],
            total: 152500.00
        });
        
        const order2 = this.model.createOrder({
            customerId: 'CUST1696485123456790',
            items: [
                { itemId: 'ITEM1696485123456792', name: 'Mechanical Keyboard', price: 8500.00, quantity: 2 },
                { itemId: 'ITEM1696485123456793', name: 'USB-C Hub', price: 3500.00, quantity: 1 }
            ],
            total: 20500.00
        });
        
        const order3 = this.model.createOrder({
            customerId: 'CUST1696485123456791',
            items: [
                { itemId: 'ITEM1696485123456794', name: 'Monitor 24" LED', price: 45000.00, quantity: 1 }
            ],
            total: 45000.00
        });
    }
}
