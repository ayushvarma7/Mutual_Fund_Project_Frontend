document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#investmentTable tbody');

    fetch('http://localhost:8188/portfoliomanagers')
        .then(response => response.json())
        .then(data => {
            data.forEach(pm => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pm.managerId}</td>
                    <td>${pm.firstName}</td>
                    <td>${pm.LastName}</td>
                    <td>${pm.email}</td>
                    <td>${pm.contactNumber}</td>
                    <td> <button> Click me </button> </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
