import { updateDashboardStats } from './DashboardController.js';
class MainController {
    constructor() {
        this.model = POSModel;
        this.view = POSView;
        this.controllers = {};
        this.init();
    }
    
    init() {
        this.model.init(); // Initialize the model
        this.initializeControllers();
        this.bindEvents();
        this.loadSampleData();
        this.showLogin();
        this.loadSectionData('dashboard');
    }
    
    initializeControllers() {
        // Initialize all controllers
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
                const stats = {
                customerCount: this.model.customers.length,
                itemCount: this.model.items.length,
                orderCount: this.model.orders.length,
                totalRevenue: this.model.orders.reduce((total, ord) => total + ord.total, 0)
            };
            
                this.view.updateDashboard();
                updateDashboardStats();
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
    
     
}