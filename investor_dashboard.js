document.addEventListener("DOMContentLoaded", async()=>{
    try{
        const investorId= sessionStorage.getItem("sid");
        const URL=`http://localhost:8188/investors/id/${investorId}`;
        console.log(URL);
        const response= await fetch(URL);
        if(!response.ok){
            throw new Error("Failed to fetch data");
        }
        const data= await response.json();
        // console.log(data);
        const name= document.getElementById("welcome-name");
        name.textContent=`Welcome, ${data.firstName}!`;
    } catch(error){
        console.error("Error fetching data: ", error);
    }

    // getting the total amount invested

    try{
        const investorId= sessionStorage.getItem("sid");
        const URL=`http://localhost:8188/investments/id/${investorId}`;
        const response= await fetch(URL);
        if(!response.ok){
            throw new Error("Failed to fetch data");
        }
        const investments= await response.json();

        let investedAmount=0;

        console.log(investments.length);
        investments.forEach(investment => {
            // console.log(investment.amountInvested);
            // console.log((investment.transactionType == "BUY" ? investment.amountInvested : -(investment.amountInvested)  ));
            investedAmount= investedAmount + (investment.transactionType == "BUY" ? investment.amountInvested : -(investment.amountInvested)  ) ;
            
        });


        console.log(investedAmount);
        document.getElementById("invested-amount").textContent=investedAmount;

        document.getElementById("current-amount").textContent=Math.round(1.13*investedAmount);

        let returns=((document.getElementById("current-amount").textContent-document.getElementById("invested-amount").textContent)/(document.getElementById("invested-amount").textContent))*100;
        document.getElementById("total-returns").textContent=`${returns.toPrecision(2)}%`;

    } catch(error){
        console.error("Error fetching data: ", error);
    }

    


});


