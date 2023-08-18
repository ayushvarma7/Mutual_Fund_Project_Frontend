document.addEventListener("DOMContentLoaded", async()=>{
    
    try{
        const investorId= sessionStorage.getItem("sid");
        const URL=`http://localhost:8188/investors/id/${investorId}`
        const response= await fetch(URL);
        if(!response.ok){
            throw new Error("Failed to fetch data");
        }
        const investor= await response.json();
        console.log(investor);

        document.getElementById("user-name").innerHTML=investor.firstName + " " + investor.lastName;
        document.getElementById("user-email").innerHTML=investor.email;
        document.getElementById("user-phoneno").innerHTML=investor.contactNumber;
        
    } catch(error){
        console.error("Error fetching data: ", error);
    }
});