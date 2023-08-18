
        document.addEventListener("DOMContentLoaded", () => {
            const stockTickerSelect = document.getElementById('stockTicker');
            const selectStocksButton = document.getElementById('selectStocks');
            const stocksContainer = document.getElementById('stocksContainer');
            const stocksBody = document.getElementById('stocksBody');

            console.log("Fetching stock tickers...");

            // Fetch stock tickers from your API
            fetch('http://localhost:8188/stocks')
                .then(response => response.json())
                .then(data => {
                    console.log("Fetched data:", data);

                    const uniqueStockTickers = Array.from(new Set(data.map(stock => stock.stockTicker)));
                    console.log("Fetched unique stock tickers:", uniqueStockTickers);


                    selectStocksButton.addEventListener('click', () => {
                        console.log("Select Stocks button clicked");

                        stocksContainer.style.display = 'block';
                        selectStocksButton.style.display = 'none';
                        
                        stocksBody.innerHTML = ''; // Clear any existing rows
                        
                        data.forEach(stock => {
                            if (uniqueStockTickers.includes(stock.stockTicker)) {
                                console.log("Adding stock:", stock.stockTicker);
                                const newRow = `
                                    <tr>
                                        <td>${stock.stockTicker}</td>
                                        <td><input type="number" class="weightage" min="0" max="100"></td>
                                        <td><input type="checkbox" class="selectStock"></td>
                                    </tr>
                                `;
                                stocksBody.insertAdjacentHTML('beforeend', newRow);
                                
                                // Remove the stock ticker from the array to prevent duplicates
                                uniqueStockTickers.splice(uniqueStockTickers.indexOf(stock.stockTicker), 1);
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('Error fetching stock tickers:', error);
                });

            // Rest of your JavaScript code here
        });


        const stocksContainer = document.getElementById('stocksContainer');
        const selectStocksButton = document.getElementById('selectStocks');
        const createButton = document.getElementById('createButton');

        selectStocksButton.addEventListener('click', () => {
            stocksContainer.style.display = 'block';
            selectStocksButton.style.display = 'none';
        });

        createButton.addEventListener('click', () => {
            const currentDate = new Date().toLocaleDateString();
            const fundName = document.getElementById('fundName').value;
            const expenseRatio = document.getElementById('expenseRatio').value;
            const nav = document.getElementById('nav').value;
            const exitLoad = document.getElementById('exitLoad').value;

            const selectedStocks = [];
            const stockRows = stocksContainer.querySelectorAll('tbody tr');

            stockRows.forEach(row => {
                const stockName = row.cells[0].textContent;
                const weightage = parseFloat(row.querySelector('.weightage').value);

                if (row.querySelector('.selectStock').checked) {
                    selectedStocks.push({
                        stockName: stockName,
                        weightage: weightage
                    });
                }
            });

            if (selectedStocks.length === 0) {
                alert("Please select at least one stock.");
                return;
            }

            const totalWeightage = selectedStocks.reduce((total, stock) => total + stock.weightage, 0);

            if (totalWeightage !== 100) {
                alert("Total weightage of selected stocks must be 100%.");
                return;
            }

            if (selectedStocks.some(stock => stock.weightage < 0 || stock.weightage > 100)) {
                alert("Stock weightage should be between 0 and 100.");
                return;
            }

            // Capture the details and selected stock data
            const mutualFundDetails = {
                fundName: fundName,
                expenseRatio: expenseRatio,
                nav: nav,
                exitLoad: exitLoad,
                selectedStocks: selectedStocks,
                creationDate: currentDate
            };

            console.log(mutualFundDetails);
        });

        // const stockDataFromDatabase=[];

        stockDataFromDatabase.forEach(stock => {
            const newRow = `
                <tr>
                    <td class="stockName">${stock.stockName}</td>
                    <td><input type="number" class="weightage" min="0" max="100" required></td>
                    <td><input type="checkbox" class="selectStock"></td>
                </tr>
            `;
            stocksBody.insertAdjacentHTML('beforeend', newRow);
        });

        fetch('http://localhost:8188/mutualfund/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mutualFundDetails)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Mutual fund created:', data);
        alert('Mutual fund created successfully!');
        // Optionally, you can clear the form or perform other actions here
    })
    .catch(error => {
        console.error('Error creating mutual fund:', error);
        alert('Error creating mutual fund. Please try again.');
    });

  