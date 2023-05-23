import { hideLoading } from "./viewEvent.js";
import CountryClass from "./countryClass.js";

export let country_ar = []
export let all_country_ar = [];
let first_countries = ["Israel", "United States", "United Kingdom", "France", "Thailand"]
export let isMobile = window.matchMedia('only screen and (max-width: 768px)').matches;

export const createList5buttons = () => {
  let ar = document.querySelectorAll(".first5")
  ar.forEach((item) => {
    item.addEventListener("click", () => {
      nav_open.style.display == "flex" && isMobile ? nav_open.style.display = "none" : nav_open.style.display = "flex";
      createCountryItemOfName(item.id)
    })
  })
}

export const allCountry = (_ar) => {
  all_country_ar = _ar
  country_ar = _ar.filter((item) => {
    return first_countries.includes(item.name.common)
  })
  showCards(country_ar)
}

export const showCards = (_ar) => {
  document.querySelector("#id_data_cards").innerHTML =""
  hideLoading();
  _ar.forEach((item) => {
    let cardButton = document.createElement("button")
    cardButton.className = "card col-md-3 my-3 mx-auto p-0 text-center border-0 rounded-2"
    document.querySelector("#id_data_cards").append(cardButton)
    cardButton.innerHTML = `
          <div class="flags p-1 mx-auto">
              <img src="${item.flags.png}" alt="${item.title}" />
          </div>
          <div class="mx-auto p-2 my-2">
              <h2 class="name-country">${item.name.common}</h2>
              <p>POP: ${Number(item.population).toLocaleString()}</p>
              <p>Region: ${item.region}</p>
          </div>
          <p class="press-text mx-auto"><strong>Press for more info</strong></p>
        `
    cardButton.addEventListener("click", () => {
      createCountryCard(item)
    })
  });
}

export const createCountryCard = (_item) => {
  document.querySelector(".card-info").style.display = "flex";
  document.querySelector("main").style.display = "none"
  document.querySelector(".card-info").innerHTML = ""
  let country = new CountryClass(".card-info", _item);
  country.render();
}

export const createCountryItemOfName = (_name) => {
  all_country_ar.forEach((item) => {
    if (item.name.common == _name) {
      createCountryCard(item)
    }
  })
}

export const filterByCountryCode = (_code) => {
  let country = all_country_ar.filter(item => {
    return item.cca3 == _code
  })
  createCountryCard(country[0])
}

export const fillSelectBox = () => {
  let select = document.querySelector("#id_select_country")
  all_country_ar.forEach((item) => {
    select.innerHTML += `
      <option class="option-country col-3 col-md-2" value="${item.name.common}">
      ${item.name.common.length > 18 ? item.name.common.substring(0, 18) + "..." : item.name.common}</option>;
      `
  })
}
//חיפוש גבול עם קריאה חדשה לדעתי מיותר 
export const getNameByCode = async (_code) =>{
  let url = `https://restcountries.com/v3.1/alpha/${_code}`;
  let resp = await fetch(url)
  let data = await resp.json()
  return data[0]
}
