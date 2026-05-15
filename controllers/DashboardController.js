import { getAllCustomers } from "../model/CustomerModel.js";
import { getAllItems } from "../model/ItemModel.js";
import { getAllOrders } from "../model/OrderModel.js";

let ordersChart = null;

// Dashboard Stats
function updateDashboardStats() {

    const customers = getAllCustomers();
    const items = getAllItems();
    const orders = getAllOrders();

    // Counts
    $('#customerCount').text(customers.length);
    $('#itemCount').text(items.length);
    $('#orderCount').text(orders.length);

    // Revenue
    let totalRevenue = orders.reduce(
        (total, order) => total + parseFloat(order.total),
        0
    );

    $('#totalRevenue').text(`RS: ${totalRevenue.toFixed(2)}`);

    loadRecentOrders();
    loadOrdersChart();
}

// Recent Orders Table
function loadRecentOrders() {

    $('#recentOrdersTableBody').empty();

    const orders = getAllOrders();

    orders.slice(0, 5).forEach(order => {

        $('#recentOrdersTableBody').append(`
            <tr>
                <td>${order.orderId}</td>
                <td>${order.customerName}</td>
                <td>${order.date}</td>
                <td>RS ${order.total}</td>
            </tr>
        `);

    });

}

// Chart
function loadOrdersChart() {

    const orders = getAllOrders();

    const labels = orders.map(order => order.date);

    const totals = orders.map(order => order.total);

    const ctx = document.getElementById('ordersChart');

    if (ordersChart) {
        ordersChart.destroy();
    }

    ordersChart = new Chart(ctx, {

        type: 'bar',

        data: {

            labels: labels,

            datasets: [{
                label: 'Order Totals',

                data: totals,

                borderWidth: 1
            }]
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

export { updateDashboardStats };