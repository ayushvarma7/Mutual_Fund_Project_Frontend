const urlParams= new URLSearchParams(window.location.search);
const mutualfundId=urlParams.get("id");

document.addEventListener("DOMContentLoaded", async()=>{

    try{
      const URL= `http://localhost:8188/mutualfunds/id/${mutualfundId}`;
    //   console.log(URL);
      const response= await fetch(URL);
      if(!response.ok){
        throw new Error("Failed to fetch data");
    }

      const data= await response.json();
      console.log(data);

      document.getElementById("textHeading").innerText=`Invest in ${data.fundName}`;
      document.getElementById("fundName").innerText=data.fundName;
      document.getElementById("aumInvested").innerText=`Rs ${data.assetsUnderManagement}`;
      document.getElementById("currentNav").innerText=`Rs ${data.currentNAV}`;
    }catch(error){
        console.error("Error fetching data: ", error);
    }
    
});