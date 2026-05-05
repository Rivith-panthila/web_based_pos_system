// POS View - UI Management
const POSView = {
    chartInstance: null,
    showLogin: function() {
        $('#loginContainer').removeClass('d-none');
        $('#mainApp').addClass('d-none');
    },
    
    showMainApp: function() {
        $('#loginContainer').addClass('d-none');
        $('#mainApp').removeClass('d-none');
        $('#currentUser').text(POSModel.currentUser);
    },
    
    showSection: function(sectionName) {
        $('.content-section').addClass('d-none');
        $(`#${sectionName}Section`).removeClass('d-none');
        
        $('.nav-link').removeClass('active');
        $(`.nav-link[data-section="${sectionName}"]`).addClass('active');
    },
    
    updateDashboard: function() {
        const stats = POSModel.getDashboardStats();
        $('#customerCount').text(stats.customerCount);
        $('#itemCount').text(stats.itemCount);
        $('#orderCount').text(stats.orderCount);
        $('#totalRevenue').text('$' + stats.totalRevenue.toFixed(2));
        
        this.updateChart();
    },
    
    updateChart: function() {
        const chartData = POSModel.getOrdersChartData();
        const maxValue = Math.max(...chartData.data, 1);
        
        // Update bars
        chartData.labels.forEach((day, index) => {
            const value = chartData.data[index];
            const percentage = (value / maxValue) * 100;
            const bar = $(`.bar[data-day="${day}"]`);
            bar.css('height', percentage + '%');
            bar.find('.bar-value').text('$' + value.toFixed(2));
        });
        
        // Update SVG line chart
        this.updateLineChart(chartData.data, maxValue);
    },
    
    updateLineChart: function(data, maxValue) {
        const points = data.map((value, index) => {
            const x = index * 100;
            const y = 200 - ((value / maxValue) * 180);
            return `${x},${y}`;
        });
        
        const pathData = `M ${points.join(' L ')}`;
        const areaData = `M ${points.join(' L ')} L 700 200 L 0 200 Z`;
        
        $('.chart-path').attr('d', pathData);
        $('.chart-area').attr('d', areaData);
        
        // Update points
        data.forEach((value, index) => {
            const x = index * 100;
            const y = 200 - ((value / maxValue) * 180);
            $(`.chart-point`).eq(index).attr('cy', y);
        });
    },
    
    renderCustomersTable: function() {
        const customers = POSModel.getAllCustomers();
        const tbody = $('#customersTable tbody');
        tbody.empty();
        
        if (customers.length === 0) {
            tbody.append('<tr><td colspan="5" class="text-center">No customers</td></tr>');
            return;
        }
        
        customers.forEach(customer => {
            tbody.append(`
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.contact}</td>
                    <td>${customer.address}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-customer" data-id="${customer.id}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-customer" data-id="${customer.id}">Delete</button>
                    </td>
                </tr>
            `);
        });
    },
    
    renderItemsTable: function() {
        const items = POSModel.getAllItems();
        const tbody = $('#itemsTable tbody');
        tbody.empty();
        
        if (items.length === 0) {
            tbody.append('<tr><td colspan="5" class="text-center">No items</td></tr>');
            return;
        }
        
        items.forEach(item => {
            tbody.append(`
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-item" data-id="${item.id}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-item" data-id="${item.id}">Delete</button>
                    </td>
                </tr>
            `);
        });
    },
    
    renderOrderItemsTable: function(orderItems = []) {
        const tbody = $('#orderItemsTable tbody');
        tbody.empty();
        
        if (orderItems.length === 0) {
            tbody.append('<tr><td colspan="5" class="text-center">No items in order</td></tr>');
            $('#orderTotal').text('0.00');
            return;
        }
        
        let total = 0;
        orderItems.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            
            tbody.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <input type="number" class="form-control form-control-sm order-item-quantity" 
                               value="${item.quantity}" min="1" data-index="${index}">
                    </td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-danger remove-order-item" data-index="${index}">Remove</button>
                    </td>
                </tr>
            `);
        });
        
        $('#orderTotal').text(total.toFixed(2));
    },
    
    renderAvailableItemsTable: function() {
        const items = POSModel.getAllItems();
        const tbody = $('#availableItemsTable tbody');
        tbody.empty();
        
        if (items.length === 0) {
            tbody.append('<tr><td colspan="4" class="text-center">No items</td></tr>');
            return;
        }
        
        items.forEach(item => {
            tbody.append(`
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                </tr>
            `);
        });
    },
    
    renderOrderHistoryTable: function() {
        const orders = POSModel.getAllOrders();
        const tbody = $('#orderHistoryTable tbody');
        tbody.empty();
        
        if (orders.length === 0) {
            tbody.append('<tr><td colspan="5" class="text-center">No orders</td></tr>');
            return;
        }
        
        orders.forEach(order => {
            const customer = POSModel.getCustomer(order.customerId);
            const customerName = customer ? customer.name : 'Unknown';
            const date = new Date(order.createdAt).toLocaleDateString();
            
            tbody.append(`
                <tr>
                    <td>${order.id}</td>
                    <td>${customerName}</td>
                    <td>${date}</td>
                    <td>${order.items.length} items</td>
                    <td>$${order.total.toFixed(2)}</td>
                </tr>
            `);
        });
    },
    
    populateCustomerSelect: function() {
        const select = $('#orderCustomer');
        select.empty();
        select.append('<option value="">Choose a customer...</option>');
        
        POSModel.getAllCustomers().forEach(customer => {
            select.append(`<option value="${customer.id}">${customer.name}</option>`);
        });
    },
    
    populateItemSelect: function() {
        const select = $('#orderItemSelect');
        select.empty();
        select.append('<option value="">Choose an item...</option>');
        
        POSModel.getAllItems().forEach(item => {
            if (item.quantity > 0) {
                select.append(`<option value="${item.id}">${item.name} - $${item.price}</option>`);
            }
        });
    }
};
