const currencyList = ["USD", "CAD", "EUR", "GBP", "JPY"];

const fromSelect = document.getElementById("originCurrency");
const convertTo = document.getElementById("convertedTo");

//add each currency option to the two selects
currencyList.forEach(currency => {
    let optionOne = document.createElement("option");
    optionOne.value = currency;
    optionOne.textContent = currency;
    fromSelect.appendChild(optionOne);

    let optionTwo = document.createElement("option");
    optionTwo.value = currency;
    optionTwo.textContent = currency;
    convertTo.appendChild(optionTwo);
});

//after they click the convert button grab the values
document.getElementById("convertBtn").addEventListener("click", async() => {
    const original = document.getElementById("originCurrency").value;
    const convert =  document.getElementById("convertedTo").value;
    const amount = document.getElementById("amount").value;



    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${original}&currencies=${convert}`

    //try to grab the exchange rates from the API and calculate the results before telling the user the exchance rates
    try{
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.data[convert].value;
        console.log(amount, original, rate, data, convert)
        document.getElementById("result").innerText = 
        `${amount} ${original} = ${(amount * rate).toFixed(2)} ${convert}`;
    }catch(error){
        console.error("Error fetching data:", error);
    }
});