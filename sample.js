// Dummy data for the graph
var investmentValues = [1000, 1050, 1030, 1045, 1060, 1100, 1120, 1130, 1150, 1170];
var days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"];

var ctx = document.getElementById('investmentChart').getContext('2d');
var investmentChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'Investment Value',
            data: investmentValues,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// The rest of the JavaScript will handle fetching the user's investment data and populating the dashboard.
