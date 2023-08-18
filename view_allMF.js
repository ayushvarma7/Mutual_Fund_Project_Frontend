document.addEventListener("DOMContentLoaded", async () => {
    const fundsList = document.getElementById("funds-list");

    try {
        const response = await fetch("http://localhost:8188/mutualfunds/"); // Replace with your API URL
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data[0]);

        data.forEach(fund => {  
            const card = document.createElement("div");
            card.className="mf";

            card.innerHTML=`
            <h3>${fund.fundName}</h3>
            <p>NAV: ${fund.currentNAV}</p>
            <p>AUM: ${fund.assetsUnderManagement}</p>
            <p>Expense Ratio: ${fund.expenseRatio} </p>
            <p>Exit Load: ${fund.exitLoad}</p>
            <p>Inception Date: ${fund.inceptionDate}</p>
            <a href="investnow.html" class="btn-invest">Invest </a>          
            `;

            fundsList.appendChild(card);
           
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
