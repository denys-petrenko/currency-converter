let btn = document.querySelector(".exchange")
let valueAmount = document.querySelector(".rate")
let filterCountry = document.querySelectorAll(".filter")
// let result = document.getElementsByName("outcome")
let result = document.querySelector('input[name="outcome"]')

// const url = fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
const url = fetch("https://api.exchangerate-api.com/v4/latest/USD")



window.addEventListener("load", currencies(filterCountry));




function currencies(selection) {
    const allowedCurrencies = ["USD", "EUR", "UAH", "PLN", "GBP", "CNY", "CAD", "AUD", "JPY"];
    
    url
    .then(response => response.json())
    .then(json => {
        const currencies = Object.keys(json.rates);
        allowedCurrencies.forEach(element => {
            selection.forEach(item => createOption(item, element));
            btn.addEventListener("click",() => converting(element));
})

})
}

function createOption(select, el) {
    let option = document.createElement("option");
    option.text = `${getFlagEmoji(el)} ${el}`;
    // option.text = el;
    // option.value = "EUR";
    select.add(option)
}


function converting(el) {
    let currencyFrom = document.querySelector('select[name="currencyFrom"]').value;
    let currencyTo = document.querySelector('select[name="currencyTo"]').value;

        const apiUrl = fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`);
        apiUrl
        .then(response => response.json())
        .then(json => {
            const rate = json.rates[currencyTo];
            let res = (valueAmount.value * rate).toFixed(2);
            result.value = `${valueAmount.value} ${currencyFrom} = ${res} ${currencyTo}`
        })
}

function getFlagEmoji(currency) {
    const currencyToCountry = {
        USD: 'US',
        EUR: 'EU',
        GBP: 'GB',
        JPY: 'JP',
        CNY: 'CN',
        CAD: 'CA',
        AUD: 'AU',
        UAH: 'UA',
        PLN: 'PL',
    };

    const countryCode = currencyToCountry[currency];
    if (!countryCode) return '';

    return String.fromCodePoint(...[...countryCode].map(char => char.charCodeAt(0) + 0x1F1A5));
}