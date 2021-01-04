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

// page havigation

window.location.href = "#main"

function applyState() {
    const path = window.location.href;
    const hashPos = path.lastIndexOf("#");
    let hashName = "";
    if (hashPos >= 0) {
        hashName = path.slice(hashPos + 1);
    }
    if (hashName == "main") {
        $(".active__wrapper-form").show();
        $(".active__wrapper-access").hide();
        $(".active__wrapper-final").hide();
    } else if (hashName == "questionaire") {
        $(".active__wrapper-form").hide();
        $(".active__wrapper-access").show();
        $(".active__wrapper-final").hide();
    } else if (hashName == "last") {
        $(".active__wrapper-form").hide();
        $(".active__wrapper-access").hide();
        $(".active__wrapper-final").show();
    }
}

window.onpopstate = applyState;

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

// State

const formData = {
    name: "",
    mail: "",
    phone: "",
    country: ""
}

// Start Questionaire

$("#form-submit").click((e) => {
    e.preventDefault;
    let valid = true;
    $("#form input").each(function(i,el){
        if (el.checkValidity() !== true) {
            valid = false;
        } 
    })

    // saving form data 

    if (valid) {
        formData.name = $(".input__name").val();
        formData.mail = $(".input__email").val();
        formData.phone = $(".input__phone").val();
        formData.country = $(".country__input").val();
    }

    // !!! move above !!!

    $(".active__wrapper-form").hide();
    $(".active__wrapper-access").show("fast");
    window.location.href = "#questionaire"
})

// Quiz start

$(".question__link-button").click((e) => {
    e.preventDefault();
    $(".active__wrapper-access").hide();
    $(".active__wrapper-questionaire").show();

    // prevent back

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    };
})

    // next question

const answers = {
    1: null,
    2: null,
    3: null,
    4: null
};

let question = 1;

$(".questionaire__option").each((i, el) => {
    $(el).click(() => {
        answers[question] = i + 1;
        question++;
        if (question <= 4) {
            $(".questionaire__option").each((ind, elem) => {
                $(elem).children(`.picture:eq(${question - 2})`).hide();
                $(elem).children(`.picture:eq(${question - 1})`).fadeIn();
                $(elem).children(`.questionaire__answer:eq(${question - 2})`).hide();
                $(elem).children(`.questionaire__answer:eq(${question - 1})`).fadeIn();
                $(".progressbar__list").children(`li:eq(${question - 1})`).addClass("item_active");
            })
        } else {
            $(".active__wrapper-questionaire").hide();
            $(".active__wrapper-final").show();
            window.location.href = "#last"
            window.onpopstate = applyState;
            postData();
        }
        if (question == 2) {
            postData();
        }
    })
})

// post request with answers

function postData() {
    let data = formData;
    let answer = "";
    for (let i in answers) {
        if (answers[i]) {
            answer += `Question -${i}: ${answers[i]};`;
        }
    }
    data.answers = answer;
    $.ajax({
        type: "POST",
        url: "server.php",                  // change accordingly
        data: JSON.stringify(data)
    })
}

