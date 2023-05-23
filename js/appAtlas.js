import declareBtns from "./viewEvent.js"
import { createList5buttons, allCountry, fillSelectBox } from "./countriesManager.js";
import { showLoading } from "./viewEvent.js";

const init = () => {
  declareBtns();
  doApi("all")
  createList5buttons();
}


const doApi = async (searchQ) => {
  showLoading();
  let url = `https://restcountries.com/v3.1/${searchQ}`;
  let resp = await fetch(url)
  let data = await resp.json()
  data = data.filter(item =>item.name.common != "Palestine")
  console.log(data)
  allCountry(data)
  fillSelectBox();
};

init()