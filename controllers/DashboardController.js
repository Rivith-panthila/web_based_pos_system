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
    
    // දැනට තියෙන chart එකක් ඇත්නම් එය ඉවත් කරන්න (Re-render glitch වැළැක්වීමට)
    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // මේවා db එකෙන් dynamic ගන්න පුළුවන්
            datasets: [{
                label: 'Orders',
 
}