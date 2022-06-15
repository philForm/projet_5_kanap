import { nameValid } from "./formulaire.js"

import { firstNameInput, firstNameError, lastNameInput, addressInput, addressError, cityInput, cityError, emailInput, orderForm, form, regexEmail, regexAdress, regexName, lastNameError, emailError, regexCity } from "./const.js"

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

// Récupération des données du formulaire à partir de l'url
const recupForm = () => {
    const url = new URL(window.location.href);
    console.log(url)
    const searchParams = new URLSearchParams(url.search);
    console.log(url.searchParams)
    const map = new Map()
    url.searchParams.forEach((value, key) => {
        map.set(key, value)
    })
    return Object.fromEntries(map) // convertit un objet Map en Objet
}

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

orderForm.addEventListener("click", (e) => {
    e.preventDefault();
    objValue = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value

    }

    console.log(objValue)
    console.log(getCart("cart"))
})

const testReg = new RegExp("^[^0-9]+$")


firstNameInput.addEventListener("change", () => {
    isValid = nameValid(regexName, firstNameInput.value, firstNameError)
})


lastNameInput.addEventListener("change", () => {
    nameValid(regexName, lastNameInput.value, lastNameError)

})

addressInput.addEventListener("change", () => {
    console.log(nameValid(regexAdress, addressInput.value, addressError))
})

cityInput.addEventListener("change", () => {
    console.log(nameValid(regexCity, cityInput.value, cityError))
})

emailInput.addEventListener("change", () => {
    console.log(nameValid(regexEmail, emailInput.value, emailError))
})

let color = "arlequin"
const testColor = "je suis en rouge et en vert et en gris, et rouge aussi"
// const replaceColor = (test, color, regex) => {
//     const testRegex = test.match(regex)
//     if (testRegex) {
//         console.log(testRegex)
//         for (let i = 0; i < testRegex.length; i++)
//             test = test.replace(testRegex[i], color)
//     }
//     return test
// }

// console.log(replaceColor(testColor, color, regexColors))




export { recupId, priceCumul, funcTabArticle, recupForm }