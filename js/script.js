"use strict";

const form = document.forms["search_form"],
      input = form.querySelector("input"),
      wrapper = document.querySelector(".main_wrapper"),
      info = document.querySelector(".main_info");
      
form.addEventListener("submit", e => {
    e.preventDefault();
    wrapper.classList.add("main_active");
    info.classList.remove("show");
    let countryName = input.value;
    form.reset();
    sendRequest("GET", `https://restcountries.com/v3.1/name/${countryName}`)
        .then(data => {
            renderInfo(data[0]);
        })
    
})

function sendRequest(method, url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response;
            }
        })
}

function renderInfo(data) {
    info.classList.add("show");
    console.log(data)
    info.innerHTML = `
        <img src ="${data.flags.svg}" alt="" class="info_flag">
        <div class="info_capital">Capital: ${data.capital[0]}</div>
        <div class="info_continent">Continent: ${data.continents[0]}</div>
        <div class="info_population">Population: ${data.population}</div>
        <div class="info_currency">Currency: ${getCurrency(data.currencies)}</div>
        <div class="info_languages">Language: ${getLang(data.languages)}</div>
    `;
}

function getLang(obj) {
    let res = "";
    for (let key in obj) {
        res += obj[key] + ", ";
    }
    return res.slice(0, -2);
}

function getCurrency(obj) {
    let res = "";
    for (let key in obj) {
        for (let jey in obj[key]) {
            res += obj[key][jey] + ", "
        }
    }
    return res.slice(0, -2);
}

/* 
    <img src="" alt="" class="info_flag">
    <div class="info_capital"></div>
    <div class="info_continent"></div>
    <div class="info_population"></div>
    <div class="info_currency"></div>
    <div class="info_languages"></div>
*/