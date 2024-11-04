let btn = document.querySelector(".exchange");
let valueAmount = document.querySelector(".rate");
let filterCountry = document.querySelectorAll(".filter");
let result = document.querySelector(".outcome");

window.addEventListener("load", currencies(filterCountry));

function currencies(selection) {
    let allowedCurrencies = ["USD", "EUR", "UAH", "PLN", "GBP", "CNY", "CAD", "AUD", "JPY"];
    allowedCurrencies.forEach(element => selection.forEach(item => createOption(item, element)));
    btn.addEventListener("click", () => converting());
}

function createOption(select, country) {
    let option = document.createElement("option");
    option.textContent = `${getFlag(country)} ${country}`;
    option.value = country;
    select.add(option);
}


function converting() {
    let currencyFrom = document.querySelector('select[name="currencyFrom"]').value;
    let currencyTo = document.querySelector('select[name="currencyTo"]').value;

    const apiUrl = fetch(`https://v6.exchangerate-api.com/v6/b141d32d99322617005529e7/latest/${currencyFrom}`);
    apiUrl
        .then(response => response.json())
        .then(json => {
            const rate = json.conversion_rates[currencyTo];
            let res = (valueAmount.value * rate).toFixed(2);
            result.textContent = `${valueAmount.value} ${currencyFrom} = ${res} ${currencyTo}`;
        });
}


function getFlag(currency) {
    let currencyToCountry = { USD: "US", EUR: "EU", GBP: "GB", JPY: "JP", CNY: "CN", CAD: "CA", AUD: "AU", UAH: "UA", PLN: "PL" };

    const countryCode = currencyToCountry[currency];
    if (!countryCode) return "";

    return String.fromCodePoint(...[...countryCode].map(char => char.charCodeAt(0) + 0x1F1A5));
}