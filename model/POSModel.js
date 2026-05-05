// POS Model - Data Management
const POSModel = {
    users: [{ username: 'admin', password: 'admin123' }],
    customers: [],
    items: [],
    orders: [],
    currentUser: null,
    
    addCustomer: function(customer) {
        const newCustomer = {
            id: this.generateId('CUST'),
            ...customer,
            createdAt: new Date().toISOString()
        };
        this.customers.push(newCustomer);
        return newCustomer;
    },
    
    getCustomer: function(id) {
        return this.customers.find(c => c.id === id);
    },
    
    getAllCustomers: function() {
        return this.customers;
    },
    
    deleteCustomer: function(id) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers.splice(index, 1);
            return true;
        }
        return false;
    },
    
    addItem: function(item) {
        const newItem = {
            id: this.generateId('ITEM'),
            ...item,
            createdAt: new Date().toISOString()
        };
        this.items.push(newItem);
        return newItem;
    },
    
    getItem: function(id) {
        return this.items.find(i => i.id === id);
    },
    
    getAllItems: function() {
        return this.items;
    },
    
    deleteItem: function(id) {
        const index = this.items.findIndex(i => i.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    },
    
    createOrder: function(orderData) {
        const newOrder = {
            id: this.generateId('ORD'),
            ...orderData,
            createdAt: new Date().toISOString()
        };
        this.orders.push(newOrder);
        
        // Update item quantities
        orderData.items.forEach(orderItem => {
            const item = this.getItem(orderItem.itemId);
            if (item) {
                item.quantity -= orderItem.quantity;
            }
        });
        
        return newOrder;
    },
    
    getAllOrders: function() {
        return this.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    authenticate: function(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = username;
            return true;
        }
        return false;
    },
    
    logout: function() {
        this.currentUser = null;
    },
    
    generateId: function(prefix) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `${prefix}${timestamp}${random}`;
    },
    
    getDashboardStats: function() {
        return {
            customerCount: this.customers.length,
            itemCount: this.items.length,
            orderCount: this.orders.length,
            totalRevenue: this.orders.reduce((sum, order) => sum + order.total, 0)
        };
    },
    
    getOrdersChartData: function() {
        const ordersByDay = {};
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        // Initialize all days with 0
        days.forEach(day => {
            ordersByDay[day] = 0;
        });
        
        // Count orders by day
        this.orders.forEach(order => {
            const dayName = new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
            if (ordersByDay[dayName] !== undefined) {
                ordersByDay[dayName] += order.total;
            }
        });
        
        return {
            labels: days,
            data: days.map(day => ordersByDay[day])
        };
    }
};
