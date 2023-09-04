const urlParams = new URLSearchParams(window.location.search);
const investmentId = urlParams.get('id');


const redeem_btn = document.getElementById("redeem_btn");


document.addEventListener("DOMContentLoaded", loadValues);

redeem_btn.addEventListener("click", redeem);

let data;
let redeemableUnits;
let unitsToRedeem;
const investorId = sessionStorage.getItem('sid');

async function loadValues() {
    try {
        let URL = `http://localhost:8188/mutualfunds/id/${investmentId}`;
        console.log(URL);
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        data = await response.json();
        console.log(data);

        const fundName = document.getElementById("fundName");
        const totalUnits = document.getElementById("totalUnits");
        const redeemUnits = document.getElementById("redeemUnits");

        
        URL = `http://localhost:8188/investments/getunits/${investorId}/${data.fundId}`;
        console.log(URL);   
        response = await fetch(URL);
        redeemableUnits = await response.json();

        document.getElementById("redeemUnits").addEventListener("input", function () {
            unitsToRedeem = parseFloat(this.value);

            if (unitsToRedeem > redeemableUnits) {
                // this.setCustomValidity("Units to redeem can't exceed redeemable balance.");
                console.error("wrong")
            } else {
                this.setCustomValidity("");
            }
        });



        fundName.innerText = data.fundName;
        totalUnits.innerText = redeemableUnits;


        // console.log(data);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}



async function redeem() {

    if(unitsToRedeem > redeemableUnits ) {
        alert("Units to redeem can't be greater than balance units");
        return ;
    }


    const postData = {
        investorId: investorId,
        fundId: data.fundId,
        amountInvested: data.currentNAV* unitsToRedeem,
        transactionType: "SELL",
        units: -(unitsToRedeem)
    };

    console.log(postData);

    try{
        
    axios.post('http://localhost:8188/investments/add', postData)
    .then(responseData =>{
        console.log("Data posted successfully: ", responseData.data)
    })
    .catch(error =>{
        console.error("Error posting data: ", error);
    })

        console.log(response);
        const responseData= await response.json();
        console.log(responseData);

       
    }catch (e){

    }

    // going to investment page after 2s
    setTimeout(
    window.location.href="http://127.0.0.1:5501/view_investment.html",
    2000);
}

