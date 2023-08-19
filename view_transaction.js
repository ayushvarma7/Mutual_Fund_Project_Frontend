const urlParams = new URLSearchParams(window.location.search);
const investmentId=urlParams.get('id');

// console.log(mutualfundId);


document.addEventListener("DOMContentLoaded", async()=>{

    try{
      const URL= `http://localhost:8188//investments/investmentid/${investmentId}`;
      console.log(URL);
      const response= await fetch(URL);
      if(!response.ok){
        throw new Error("Failed to fetch data");
    }

      const data= await response.json();
      console.log(data);

      document.getElementById("transactionType").innerText=data.transactionType;
      document.getElementById("investedAmount").innerText=`Rs ${data.amountInvested}`;
      document.getElementById("investmentDate").innerText=data.dateOfInvestment;
    }catch(error){
        console.error("Error fetching data: ", error);
    }
    
});