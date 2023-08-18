
const stockLabels = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const stockPrices = [100, 101, 99, 101.5, 103, 100.3, 105, 103, 106, 104.3]

// investment graph
const investmentLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
const investmentData = [300000, 450000, 600000, 750000];

// create a stock market chart
function createStockChart() {
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockLabels,
            datasets: [{
                label: 'Investment Value (in crores)  ',
                data: stockPrices,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        borderDash: [2],
                    },
                },
            },
        },
    });
}

//  create an investment graph
function createInvestmentGraph() {
    const ctx = document.getElementById('investmentGraph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: investmentLabels,
            datasets: [{
                label: 'Investment Growth',
                data: investmentData,
                backgroundColor: '#3A3B3C',
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        borderDash: [2],
                    },
                },
            },
        },
    });
}

// Call the functions to create charts when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    createStockChart();
    createInvestmentGraph();
});
