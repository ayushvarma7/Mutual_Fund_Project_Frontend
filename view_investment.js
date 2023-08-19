document.addEventListener("DOMContentLoaded", async()=>{
    const investmentList= document.getElementById("investments-list");


    try{
        const investorId= sessionStorage.getItem("sid");
        const URL=`http://localhost:8188/investments/id/${investorId}`;
        // console.log(URL);
        const response= await fetch(URL);
        if(!response.ok){
            throw new Error("Failed to fetch data");
        }
        const data= await response.json();
        // console.log(data[0]);

        
        const fundsResponse=  await fetch("http://localhost:8188/mutualfunds/");

        const fundNames= new Map();

        const fundData=await fundsResponse.json();
        // console.log(fundData);

        fundData.forEach(fund => {
            fundNames.set(fund.fundId, fund.fundName);
        });

        // console.log(fundNames);

        data.forEach(investment => {
           const row=document.createElement("tr");
            
           const fundIdCell= document.createElement("td");
           fundIdCell.textContent= fundNames.get(investment.fundId);
           row.appendChild(fundIdCell);
           

           const amountInvestedCell=document.createElement("td");
           amountInvestedCell.textContent=investment.amountInvested;
           row.appendChild(amountInvestedCell);
           
           const transactionTypeCell= document.createElement("td");
           transactionTypeCell.textContent=investment.transactionType;
           transactionTypeCell.style.color= (transactionTypeCell.textContent=="BUY" ? "green" :"red" );
           row.appendChild(transactionTypeCell);
           
           const dateOfInvestmentCell=document.createElement("td");
           dateOfInvestmentCell.textContent=investment.dateOfInvestment;
           row.appendChild(dateOfInvestmentCell);


           let btn= document.createElement("a")
           btn.innerText="View";
           btn.href=`view_transaction.html?id=${investment.investmentId}`;
           btn.className="btn-invest";
           row.appendChild(btn);

           investmentList.appendChild(row);
            
        });
    } catch(error){
        console.error("Error fetching data: ", error);
    }

});