const urlParams = new URLSearchParams(window.location.search);
const mutualfundId = urlParams.get("id");

let data;
const investorId = sessionStorage.getItem('sid');

let currentNAV = document.getElementById("currentNav");
let exitLoad = document.getElementById("exitLoad");
let units = document.getElementById("units");
let expenseRatio;

document.addEventListener("DOMContentLoaded", async () => {

  try {
    const URL = `http://localhost:8188/mutualfunds/id/${mutualfundId}`;
    //   console.log(URL);
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    data = await response.json();
    console.log(data);

    document.getElementById("textHeading").innerText = `Invest in ${data.fundName}`;
    document.getElementById("fundName").innerText = data.fundName;
    document.getElementById("aumInvested").innerText = `Rs ${data.assetsUnderManagement}`;
    exitLoad.textContent = data.exitLoad;
    currentNAV.textContent = data.currentNAV;
    expenseRatio = data.expenseRatio;

  } catch (error) {
    console.error("Error fetching data: ", error);
  }

});


document.getElementById("investBtn").addEventListener("click", investNow);



async function investNow() {
  // console.log(document.getElementById("units").textContent);
  let investedAmount = document.getElementById("investment_amount");
  // console.log(investedAmount.value, exitLoad.textContent, currentNAV.textContent);

  let amountInvest = parseFloat(investedAmount.value) - parseFloat(expenseRatio)*parseFloat(investedAmount.value);
  amountInvest= ((1-expenseRatio/100)*investedAmount.value);
  let result = amountInvest / currentNAV.textContent;
  // console.log(document.getElementById("balance").textContent, investedAmount.value);
  if(parseFloat(investedAmount.value) > parseFloat(document.getElementById("balance").textContent)){
    alert("Can't invest more than wallet balance!");
    return;
  }
  
  
  // console.log("expense ratio: ", expenseRatio, investedAmount.value);
  // console.log("amount invested would be: ",  ((1-expenseRatio/100)*investedAmount.value)  );
  const postData = {
    investorId: parseInt(investorId),
    fundId: data.fundId,
    amountInvested: amountInvest,
    units: result,
    transactionType: "BUY"
  };
  console.log(postData);


axios.post('http://localhost:8188/investments/add', postData)
.then(responseData => {
  console.log("Data posted successfully", responseData.data)
})
.catch(error=>{
  console.error("Error posting data:", error)
})

//  going to investment page after 2s
 setTimeout(
  window.location.href="http://127.0.0.1:5501/view_investment.html",
  2000);

}