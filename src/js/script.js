import codes from './phone.js'

// country select

    // fill countries

const selectCountry = document.querySelector("#dropdown");

function fillCountries() {
    codes.forEach(item => {
        const newOption = document.createElement('div');
        newOption.classList.add("country__item");
        newOption.innerHTML = item.name;
        selectCountry.appendChild(newOption);
    })
}

fillCountries();

    // apply dropdown functionality

const buttonCountry = document.querySelector('#country');
const optionsCountry = document.querySelectorAll(".country__item");
const selectLabel = document.querySelector('#select-label');
const phone = document.querySelector('.input__phone');

buttonCountry.addEventListener("click", function (e) {
    e.preventDefault();
    toggleHidden();
});

optionsCountry.forEach(function (option) {
    option.addEventListener("click", function (e) {
        const base = codes.find(item => item.name == e.target.innerText);
        selectLabel.value = e.target.innerText;
        phone.value = base.Iso;
        toggleHidden();

        const hiddenOptions = selectCountry.querySelectorAll('.hidden');
        hiddenOptions.forEach(item => {
            item.classList.remove('hidden');
        })
    });
});

function toggleHidden() {
    selectCountry.classList.toggle("hidden");
}


// country search

    // get country

$.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: pasteData,
    error: () => {
        throw new Error("Get country failed")
    }
});

function pasteData(respond) {
    const code = respond.country_code;
    const base = codes.find(item => item.countryCode == code);
    phone.value = base.Iso;
    selectLabel.value = base.name;
}

    // country filtering

selectLabel.oninput = () => {
    let findVal = selectLabel.value,
        regexp = new RegExp(findVal, "gi");
    optionsCountry.forEach(item => {
        if (item.innerText.search(regexp) >= 0) {
            item.classList.remove("hidden")
        } else {
            item.classList.add("hidden")
        }
    })
}



