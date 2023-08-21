const urlParams = new URLSearchParams(window.location.search);
const investmentId = urlParams.get('id');


const redeem_btn = document.getElementById("redeem_btn");


document.addEventListener("DOMContentLoaded", loadValues);

redeem_btn.addEventListener("click", redeem);

let data;

async function loadValues() {
    try {
        const URL = `http://localhost:8188//investments/investmentid/${investmentId}`;
        console.log(URL);
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        data = await response.json();
        

        const transactionType= document.getElementById("transactionType");
        const investedAmount= document.getElementById("investedAmount");
        const investmentDate= document.getElementById("investmentDate");


        // mfName.textContent=data.
        
        transactionType.innerText=data.transactionType;
        investedAmount.innerText=`Rs ${data.amountInvested}`;
        investmentDate.innerText=data.dateOfInvestment;

        // console.log(data);
    } catch {
        console.error("Error fetching data: ", error);
    }
}



async function redeem(){

    // console.log(data);

    const postData= {
        investorId: data.investorId,
        fundId:data.fundId,
        amountInvested:data.amountInvested,
        transactionType: "SELL"
    };


    // try{

        // const response= await axios({
        //     method: 'post',
        //     url: 'http://localhost:8188/investments/add',
        //     data:postData
        // });

        axios.post('http://localhost:8188/investments/add', postData)
        .then(responseData =>{
            console.log("Data posted successfully: ", responseData.data)
        })
        .catch(error =>{
            console.error("Error posting data: ", error);
        })
        
    //     console.log(response);
    //     const responseData= await response.json();

    //     console.log(responseData);
    // }catch (e){

    // }
}