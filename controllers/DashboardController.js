import { customer_db } from '../db/db.js';
import { item_db } from '../db/db.js';
import { order_db } from '../db/db.js';

export function updateDashboardStats() {
    // Stat cards වල අගයන් update කිරීම
    $('#customerCount').text(customer_db.length);
    $('#itemCount').text(item_db.length);
    $('#orderCount').text(order_db.length);

    // Income එක ගණනය කිරීම
    let totalIncome = order_db.reduce((total, order) => total + order.total, 0);
    $('#totalRevenue').text(`RS: ${totalIncome.toFixed(2)}`);
    
    updateOrdersChart();
}

function updateOrdersChart() {
    const ctx = document.getElementById('ordersChart').getContext('2d');
    

}