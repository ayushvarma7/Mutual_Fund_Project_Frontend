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
           amountInvestedCell.textContent= `Rs ${investment.amountInvested}`;
           row.appendChild(amountInvestedCell);
           
           const transactionTypeCell= document.createElement("td");
           transactionTypeCell.textContent=investment.transactionType;
           transactionTypeCell.style.color= (transactionTypeCell.textContent=="BUY" ? "green" :"red" );
           row.appendChild(transactionTypeCell);
           
           const dateOfInvestmentCell=document.createElement("td");
           dateOfInvestmentCell.textContent=investment.dateOfInvestment;
           row.appendChild(dateOfInvestmentCell);


           let view_btn= document.createElement("a")
           view_btn.innerText="View";
           view_btn.href=`view_transaction.html?id=${investment.investmentId}`;
           view_btn.className="btn-invest";
           row.appendChild(view_btn);


        //    let buy_btn= document.createElement("a")
        //    buy_btn.innerText="Invest More";
        //    buy_btn.href=`investnow.html?id=${investment.fundId}`;
        //    buy_btn.className="btn-invest";
        //    buy_btn.style.margin="10px";
        // //    buy_btn.style.padding="10px 20px";

        //    let redeem_btn= document.createElement("a")
        //    redeem_btn.innerText="Redeem";
        //    redeem_btn.href=`redeem_investment.html?id=${investment.investmentId}`;
        //    redeem_btn.className="btn-invest";
        //    redeem_btn.style.margin="10px";


        //    transactionTypeCell.textContent=="BUY" ? row.appendChild(redeem_btn) : row.appendChild(buy_btn) ;

           investmentList.appendChild(row);
            
        });
    } catch(error){
        console.error("Error fetching data: ", error);
    }

});