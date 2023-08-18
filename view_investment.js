document.addEventListener("DOMContentLoaded", async()=>{
    const investmentList= document.getElementById("investments-list");


    try{
        const response= await fetch("http://localhost:8188/investments/id/1");
        if(!response.ok){
            throw new Error("Failed to fetch data");
        }
        const data= await response.json();
        console.log(data[0]);


        data.forEach(investment => {
           const row=document.createElement("tr");
            
        //    const investmentIdCell= document.createElement("td");
        //    investmentIdCell.textContent=investment.investmentId;
        //    row.appendChild(investmentIdCell);

        //    const investorIdCell=document.createElement("td");
        //    investorIdCell.textContent=investment.investorId;
        //    row.appendChild(investorIdCell);


           const fundIdCell= document.createElement("td");
           fundIdCell.textContent=investment.fundId;
           row.appendChild(fundIdCell);
           

           const amountInvestedCell=document.createElement("td");
           amountInvestedCell.textContent=investment.amountInvested;
           row.appendChild(amountInvestedCell);
           
           
           const dateOfInvestmentCell=document.createElement("td");
           dateOfInvestmentCell.textContent=investment.dateOfInvestment;
           row.appendChild(dateOfInvestmentCell);


           const btn= document.createElement("a")
           btn.innerHTML="View";
           btn.className="btn-invest";
           btn.href="view_transaction.html";
           row.appendChild(btn);

           investmentList.appendChild(row);
            
        });
    } catch(error){
        console.error("Error fetching data: ", error);
    }
});