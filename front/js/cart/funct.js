import { nameValid } from "./formulaire.js"

import { firstNameInput, firstNameError, lastNameInput, addressInput, addressError, cityInput, cityError, emailInput, orderForm, form, regexEmail, regexAdress, regexName, lastNameError, emailError, regexCity, recupLocalStorage } from "./const.js"

import { getCart } from "../utils/funct_localstor.js"

import { regexColors } from "../utils/array_colors.js"


// Récupération de l'Id
const recupId = (items) => {
    let tabId = []
    for (let item of items)
        tabId.push(item.id)

    return tabId
}

// Multiplication du prix par le nombre d'article
let priceCumul = (nbArticle, price) => {
    return nbArticle * price
}

// Tableau d'articles du localstorage
const funcTabArticle = (jsonArticle, recupLocalStorage) => {
    const tabArticle = []
    for (let article of jsonArticle) {
        for (let loc of recupLocalStorage) {
            if (loc.id == article._id) {
                let test = []
                test.push(loc.id)
                test.push(loc.color)
                test.push(loc.quantity)
                test.push(article)
                tabArticle.push(test)
            }
        }
    }
    return tabArticle
}


// ========================================================
// ======== FORMULAIRE ====================================
// ========================================================

// Désactivation du bouton submit
// orderForm.disabled = true

// Récupération des données du formulaire à partir de l'url
// const recupForm = () => {
//     const url = new URL(window.location.href);
//     console.log(url)
//     const searchParams = new URLSearchParams(url.search);
//     console.log(url.searchParams)
//     const map = new Map()
//     url.searchParams.forEach((value, key) => {
//         map.set(key, value)
//     })
//     return Object.fromEntries(map) // convertit un objet Map en Objet
// }

// Récupération des données du formulaire en direct !
// orderForm.addEventListener("click", (e) => {
//     e.preventDefault();
//     let input = document.querySelectorAll("input")
//     const objValue = new Object
//     for (let i = 1; i < input.length -1; i++) {
//         objValue[input[i].id] = input[i].value
//     }
//     console.log(objValue)
// })

let objValue = new Object

objValue = {
    contact: {},
}

console.log(getCart('cart'))
const products = recupId(recupLocalStorage)
console.log(products)

// orderForm.addEventListener("click", (e) => {
//     e.preventDefault();
//     objValue = {
//         firstName: form.firstName.value,
//         lastName: form.lastName.value,
//         address: form.address.value,
//         city: form.city.value,
//         email: form.email.value
//     }

//     console.log(objValue)
//     console.log(getCart("cart"))
// })

firstNameInput.addEventListener("input", () => {
    nameValid(regexName, firstNameInput.value, firstNameError)
})

lastNameInput.addEventListener("input", () => {
    nameValid(regexName, lastNameInput.value, lastNameError)

})

addressInput.addEventListener("input", () => {
    nameValid(regexAdress, addressInput.value, addressError)
})

cityInput.addEventListener("input", () => {
    nameValid(regexCity, cityInput.value, cityError)
})

emailInput.addEventListener("input", () => {
    nameValid(regexEmail, emailInput.value, emailError)
})



form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Objet contenant les vérification de validité des entrées
    const formObjs = {
        firstName: nameValid(regexName, firstNameInput.value, firstNameError),
        lastName: nameValid(regexName, lastNameInput.value, lastNameError),
        address: nameValid(regexAdress, addressInput.value, addressError),
        city: nameValid(regexCity, cityInput.value, cityError),
        email: nameValid(regexEmail, emailInput.value, emailError)
    }

    let test = []
    for (let item in formObjs) {
        console.log(form.item)
        if (!formObjs[item])
            test.push(false)
        console.log(test)
    }
    console.log(test)
    if (test.length === 0) {

        let validForm = true
        for (let item in formObjs) {
            console.log(formObjs[item])
            if (!formObjs[item])
                validForm = false
        }

        for (let item in formObjs) {

            validForm ? (
                objValue.contact[item] = form[item].value,
                form[item].value = ""
                , console.log(form[item])
            ) :
                objValue = ""
        }
        validForm ? objValue.products = products :
            objValue = ""

        fetch(`http://localhost:3000/api/products/order`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objValue)

        }).then((res) => {
            console.log(res)
            console.log(res.ok)
            if (res.ok) {
                return res.json();
            }

        }).then((value) => {
            console.log(value)
            console.log(value.orderId)
            let url = new URL(window.location.href);
            let confirm = (`${url.origin}/front/html/confirmation.html?orderid=${value.orderId}`)
            window.location.href = confirm
        });

    }

    console.log(objValue)
    // objValue = {}
})


export { recupId, priceCumul, funcTabArticle }