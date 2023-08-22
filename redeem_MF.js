// document.addEventListener("DOMContentLoaded", async () => {
//     const fundsList = document.getElementById("funds-list");

//     try {
//         const response = await fetch("http://localhost:8188/mutualfunds/"); // Replace with your API URL
//         if (!response.ok) {
//             throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         console.log(data[0]);

//         data.forEach(fund => {  
//             const card = document.createElement("div");
//             card.className="mf";

//             card.innerHTML=`
//             <h3>${fund.fundName}</h3>
//             <p>NAV: ${fund.currentNAV}</p>
//             <p>AUM: ${fund.assetsUnderManagement}</p>
//             <p>Expense Ratio: ${fund.expenseRatio} </p>
//             <p>Exit Load: ${fund.exitLoad}</p>
//             <p>Inception Date: ${fund.inceptionDate}</p>
//             <a href="investnow.html?id=${fund.fundId}" class="btn-invest">Invest </a>          
//             `;

//             fundsList.appendChild(card);
           
//         });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// });



let list = document.querySelectorAll(".navigation li");
function activeLink() {
    list.forEach((item) => {
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

if (toggle) {
    toggle.onclick = function () {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    }
};

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


document.addEventListener("DOMContentLoaded", async () => {
    const fundsList = document.getElementById("funds-list");
    const numberOfMFsElement = document.getElementById("numberOfMFs");
    const investorId= sessionStorage.getItem('sid');
    try {
        const URL=`http://localhost:8188//investor/mfs/${investorId}`;
        console.log(URL);
        const response = await fetch(URL); // Replace with your API URL
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        data.forEach(fund => {
            const date = formatTimestamp(fund.inceptionDate);
            const card = document.createElement("div");
            card.className = "mf";

            card.innerHTML = `
            <h3>${fund.fundName}</h3>
            <p>NAV: ${fund.currentNAV}</p>
            <p>AUM: ${fund.assetsUnderManagement}</p>
            <p>Expense Ratio: ${fund.expenseRatio} </p>
            <p>Exit Load: ${fund.exitLoad}</p>
            <p>Inception Date: ${date}</p>
            <a href="redeem_investment1.html?id=${fund.fundId}" style="text-decoration:none" class=" btn btn-invest">Redeem Now </a>      
            `;

            fundsList && fundsList.appendChild(card);

        });

        const table = document.getElementById("mfDetails");
        data.forEach(fund => {
            console.log(fund);
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${fund.fundName}</td>
            <td> Rs ${fund.currentNAV}</td>
            `;
            table && table.appendChild(row);
        })
        const numberOfMFs = document.getElementById("numberOfMFs");
        if (numberOfMFs) numberOfMFs.innerHTML = data.length;


    } catch (error) {
        console.error("Error fetching data:", error);
    }

});

function printDetail(data) {


}
