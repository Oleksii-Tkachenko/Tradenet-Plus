import codes from './phone.js'

// country select

const buttonCountry = document.querySelector('#country');
const selectCountry = document.querySelector("#dropdown");
const optionsCountry = document.querySelectorAll(".country__option");
const selectLabel = document.querySelector('#select-label');

buttonCountry.addEventListener("click", function (e) {
    e.preventDefault();
    toggleHidden();
});

optionsCountry.forEach(function (option) {
    option.addEventListener("click", function (e) {
        setSelectTitle(e);
    });
});

function toggleHidden() {
    selectCountry.classList.toggle("hidden");
}

function setSelectTitle(e) {
    const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
    selectLabel.value = labelElement;
    toggleHidden();
};

// country search



let countryCode = async () => {
    
await $.ajax({
        url: "https://geolocation-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: function (location) {
            countryCode = location.country_code;
        }
    });
    return location.country_code
};

// const getData = async () => {
//     const res = await fetch("https://geolocation-db.com/jsonp", {
//         method: "POST",
//         headers: {
//             'Content-type': 'multipart/json'
//         },
//         body: data
//     });

//     return await res.json();
// };

async () => {
    await console.log(countryCode())
}

selectLabel.oninput = () => {
    let findVal = selectLabel.textContent,
        regexp = new RegExp(findVal, "gi");
    console.log("input")
    optionsCountry.forEach(item => {
        console.log(item.value, regexp, item.value.search(regexp))
        if (item.value.search(regexp) >= 0) {
            console.log("match")
        }
    })
}



