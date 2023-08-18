// // JavaScript code to handle opening and closing of dropdown options
// const dropdownButton = document.querySelector('.dropdown-button');
// const dropdownContainer = document.querySelector('.dropdown-container');
// const stockSelection = document.querySelector('.stock-selection');

// dropdownButton.addEventListener('click', () => {
//     dropdownContainer.classList.toggle('open');
// });

// document.addEventListener('click', (event) => {
//     if (!dropdownContainer.contains(event.target)) {
//         dropdownContainer.classList.remove('open');
//     }
// });

// // JavaScript code to handle stock selection
// const stockOptions = document.querySelectorAll('.stock-option');
// const stockCheckboxes = document.querySelectorAll('.stock-checkbox-input');
// const stockWeights = document.querySelectorAll('.stock-weight-input');
// const totalWeightElement = document.getElementById('total-weight');

// stockOptions.forEach((option, index) => {
//     option.addEventListener('click', () => {
//         const selectedStock = option.textContent.trim();
//         dropdownButton.textContent = selectedStock;
//         dropdownContainer.classList.remove('open');
        
//         // Toggle the display of stock selection for the selected stock
//         stockSelection.style.display = 'block';
        
//         // Reset the checkbox and weight input for the selected stock
//         stockCheckboxes[index].checked = false;
//         stockWeights[index].value = '';
        
//         // Update the total weight
//         updateTotalWeight();
//     });
// });

// stockCheckboxes.forEach((checkbox, index) => {
//     checkbox.addEventListener('change', () => {
//         updateTotalWeight();
//     });
// });

// stockWeights.forEach((weightInput, index) => {
//     weightInput.addEventListener('input', () => {
//         updateTotalWeight();
//     });
// });

// function updateTotalWeight() {
//     let totalWeight = 0;

//     stockCheckboxes.forEach((checkbox, index) => {
//         if (checkbox.checked) {
//             const weight = parseFloat(stockWeights[index].value) || 0;
//             totalWeight += weight;
//         }
//     });

//     totalWeightElement.textContent = totalWeight.toFixed(2);

//     if (totalWeight > 100) {
//         totalWeightElement.style.color = 'red';
//     } else {
//         totalWeightElement.style.color = 'black';
//     }
// }











document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContainer = document.querySelector('.dropdown-container');
    const stockSelection = document.querySelector('.stock-selection');
    const stockCheckboxes = document.querySelectorAll('.stock-checkbox-input');
    const stockWeights = document.querySelectorAll('.stock-weight-input');
    const totalWeightElement = document.getElementById('total-weight');
    const stockListContainer = document.getElementById('stock-list');
    const addStockButton = document.querySelector('.add-stock-button');

    let selectedStocks = [];

    dropdownButton.addEventListener('click', () => {
        dropdownContainer.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        if (!dropdownContainer.contains(event.target)) {
            dropdownContainer.classList.remove('open');
        }
    });

    addStockButton.addEventListener('click', () => {
        const selectedStockIndexes = [];

        stockCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedStockIndexes.push(index);
            }
        });

        if (selectedStockIndexes.length > 0) {
            selectedStockIndexes.forEach((index) => {
                const stock = stockCheckboxes[index].parentNode.textContent.trim();
                const weight = parseFloat(stockWeights[index].value) || 0;

                selectedStocks.push({ stock, weight });
            });

            updateStockList();
            updateTotalWeight();

            stockCheckboxes.forEach((checkbox, index) => {
                checkbox.checked = false;
                stockWeights[index].value = '';
            });

            dropdownButton.textContent = 'Select Stocks';
            stockSelection.style.display = 'none';
        }
    });

    function updateStockList() {
        stockListContainer.innerHTML = '';
        selectedStocks.forEach((item, index) => {
            const stockItem = document.createElement('div');
            stockItem.textContent = `${item.stock} - ${item.weight}%`;
            stockListContainer.appendChild(stockItem);
        });
    }

    function updateTotalWeight() {
        let totalWeight = 0;

        selectedStocks.forEach(item => {
            totalWeight += item.weight;
        });

        totalWeightElement.textContent = totalWeight.toFixed(2);

        if (totalWeight > 100) {
            totalWeightElement.style.color = 'red';
            alert("Weightage cannot be more than 100!");
        } else {
            totalWeightElement.style.color = 'black';
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        const createMFForm = document.querySelector("form");
        createMFForm.addEventListener("submit", (event) => {
            event.preventDefault();
            createMutualFund();
        });
    });
    
    function createMutualFund() {
        const mfName = document.getElementById("mf-name").value;
        const selectedStocks = getSelectedStocks();
        const totalWeight = document.getElementById("total-weight").textContent;
        const balanceCash = document.getElementById("mf-balance-cash").value;
        const exitLoad = document.getElementById("mf-exit-load").value;
        const expenseRatio = document.getElementById("mf-expense-ratio").value;
    
        const redirectURL = `created-mutual-fund.html?name=${encodeURIComponent(mfName)}&stocks=${encodeURIComponent(selectedStocks)}&weight=${encodeURIComponent(totalWeight)}&cash=${encodeURIComponent(balanceCash)}&exit=${encodeURIComponent(exitLoad)}&expense=${encodeURIComponent(expenseRatio)}`;
        window.location.href = redirectURL;
    }
    
});
