import { all_country_ar, showCards, createCountryItemOfName, isMobile } from "./countriesManager.js";

export default function declareBtns() {
  let burger_btn = document.querySelector("#burger_btn");
  let nav_open = document.querySelector("#nav_open");
  let search_btn = document.querySelector("#search_btn");
  let id_input = document.querySelector("#input_search");
  let select_box = document.querySelector("#id_select_country");
  let sort_by_box = document.querySelector("#id_sort_by");

  burger_btn.addEventListener("click", function () {
    (nav_open.style.display != "flex") ? nav_open.style.display = "flex" : nav_open.style.display = "none";
  })
  id_input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      let arr = all_country_ar.filter((item) => {
        return (item.name.common.toLowerCase().includes((id_input.value).toLowerCase()))
      })
      document.querySelector(".card-info").style.display = "none";
      document.querySelector("main").style.display = "flex"
      document.querySelector("#id_data_cards").innerHTML = ""
      if (!arr.length) {
        let div = document.createElement("div")
      div.className = "empty_search d-flex align-items-center justify-content-center w-100"
      div.innerHTML = `
        <a href="/" class="back"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></a>
        <h1 class="display-4 text-center w-75 mx-auto mx-md-0">country ${id_input.value} is not found.</h1>
      `
      document.querySelector("#id_data_cards").append(div)
      } else {
        nav_open.style.display == "flex" && isMobile ? nav_open.style.display = "none" : nav_open.style.display = "flex";
        showCards(arr)
      }
    }
  });
  search_btn.addEventListener("click", () => {
    let arr = all_country_ar.filter((item) => {
      return (item.name.common.toLowerCase().includes((id_input.value).toLowerCase()))
    })
    document.querySelector(".card-info").style.display = "none";
    document.querySelector("main").style.display = "flex"
    document.querySelector("#id_data_cards").innerHTML = ""
    if (!arr.length) {
      let div = document.createElement("div")
      div.className = "empty_search d-flex align-items-center justify-content-center w-100"
      div.innerHTML = `
        <a href="/" class="back"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></a>
        <h1 class="display-4 text-center w-75 mx-auto mx-md-0">country ${id_input.value} is not found.</h1>
      `
      document.querySelector("#id_data_cards").append(div)
    } else {
      nav_open.style.display == "flex" && isMobile ? nav_open.style.display = "none" : nav_open.style.display = "flex";
      showCards(arr)
    }
  });

  select_box.addEventListener("change", () => {
    if (select_box.value != "0") {
      nav_open.style.display == "flex" && isMobile ? nav_open.style.display = "none" : nav_open.style.display = "flex";
      createCountryItemOfName(select_box.value)
    }
  });

  sort_by_box.addEventListener("change", () => {
    if (sort_by_box.value != "") {
      nav_open.style.display == "flex" && isMobile ? nav_open.style.display = "none" : nav_open.style.display = "flex";
      document.querySelector(".card-info").style.display = "none";
      document.querySelector("main").style.display = "flex"
      document.querySelector("#id_data_cards").innerHTML = ""
      let select_val = sort_by_box.value
      let sort_ar = _.sortBy(all_country_ar, select_val)
      showCards(sort_ar)
    }
  })
}

export const showLoading = () => {
  document.querySelector("#id_load").style.display = "black";
  document.querySelector("#id_data_cards").style.display = "none";
  document.querySelector(".card-info").style.display = "none";
};
export const hideLoading = () => {
  document.querySelector("#id_load").style.display = "none";
  document.querySelector("#id_data_cards").style.display = "flex";
};