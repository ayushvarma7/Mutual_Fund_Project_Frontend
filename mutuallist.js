document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#investmentTable tbody');

    fetch('http://localhost:8188/investments')
        .then(response => response.json())
        .then(data => {
            data.forEach(investment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${investment.investmentId}</td>
                    <td>${investment.investorId}</td>
                    <td>${investment.fundId}</td>
                    <td>${investment.amountInvested}</td>
                    <td>${investment.dateOfInvestment}</td>
                    <td> <button type="button" class="btn btn-warning">Warning</button> </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
