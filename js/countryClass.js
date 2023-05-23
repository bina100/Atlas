import { all_country_ar, filterByCountryCode, createCountryCard, getNameByCode } from "./countriesManager.js";

export default class CountryClass {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.flags = _item.flags.png;
        this.name = _item.name.common;
        this.population = _item.population;
        this.region = _item.region? _item.region: "";
        this.coinType = _item.currencies? Object.keys(_item.currencies): "not found coins"
        this.coins = _item.currencies?_item.currencies[this.coinType]?.name: "not found coins";
        this.coinSimbol = _item.currencies?_item.currencies[this.coinType]?.symbol: "not found coins symbol";
        this.capital = _item.capital;
        this.languages = _item.languages ? Object.values(_item.languages) : "none";
        this.borderState = _item.borders;
        this.lat = _item.latlng[0];
        this.lng = _item.latlng[1];
        this.code = _item.cca3
    }
    render() {
        let div = document.createElement("div")
        let zoom = this.population > 100000000 ? "3" : (this.population > 10000000 ? "5" : "7")

        div.className = "row flex-sm-row flex-column align-items-center mx-auto"
        document.querySelector(this.parent).append(div)
        div.innerHTML = `
                    <div class="col-sm-3 py-1 col-6 mx-auto mt-2">
                        <img src="${this.flags}" class="w-100" alt="flag"/>
                    </div>
                    <div class="col-sm-4 mx-sm-auto mx-0 px-1 my-2">
                        <h2>${this.name}</h2>
                        <p>POP: ${(Number(this.population)).toLocaleString()}</p>
                        <p>Region: ${this.region}</p>
                        <p>Languages: ${this.languages}</p>
                        <p>Coins: ${this.coins}, ${this.coinSimbol}</p>
                        <p>Capital: ${this.capital}</p>
                        <p>States with borders:</p>
                        <ul class="border-list d-flex flex-row list-unstyled flex-wrap">
                        </ul>
                    </div>
                    <div class="map col-sm-5">
                        <iframe class="mt-4" width="100%" src="https://maps.google.com/maps?q=${this.lat},${this.lng}&z=${zoom}&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
                    </div>
                    <a href="/" class="back"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></a>
        `
        let ul = document.querySelector(".border-list")
        if (this.borderState) {
            //גבול לפי שם ארוך בחיפוש על המערך המקומי
            this.borderState.forEach(item => {
                if (item != "PSE") {
                    let fullBorderName = all_country_ar.find(fullName => {
                        return fullName.cca3 == item ? fullName.name.common : null
                    })
                    let border_link = document.createElement("a")
                    border_link.className = "px-2 px-sm-1"
                    border_link.innerHTML = `${fullBorderName.name.common}`
                    border_link.addEventListener("click", () => {
                        createCountryCard(fullBorderName)
                    })
                    ul.append(border_link)
                }
            });

            //גבול לפי שם ארוך עם בקשת api לפי קוד
            // this.borderState.forEach(async (item) => {
            //     if (item != "PSE") {
            //         let fullName = await getNameByCode(item)
            //         let border_link = document.createElement("a")
            //         border_link.className = "px-2 px-sm-1"
            //         border_link.innerHTML = `${fullName.name.common}, `
            //         console.log(fullName)
            //         console.log(item)
            //         border_link.addEventListener("click", () => {
            //             createCountryCard(fullName)
            //         })
            //         ul.append(border_link)
            //     }
            // });

            //גבול לפי שם מקוצר 
            // this.borderState.forEach(item => {
            //     if (item != "PSE") {
            //         let border_link = document.createElement("a")
            //         border_link.className = "px-2 px-sm-1"
            //         border_link.innerHTML = `${item}, `
            //         border_link.addEventListener("click", () => {
            //             filterByCountryCode(item)
            //         })
            //         ul.append(border_link)
            //     }
            // });

        } else {
            ul.innerHTML += "No have borders"
        }
    }
}