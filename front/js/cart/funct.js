import { activeButton, nameValid, nameValid2 } from "./formulaire.js";

import { firstNameInput, firstNameError, lastNameInput, addressInput, addressError, cityInput, cityError, emailInput, orderForm, form, regexEmail, regexAdress, regexName, lastNameError, emailError, regexCity, recupLocalStorage, formInputTab, objValue, formObjs } from "./const.js";

import { getCart } from "../utils/funct_localstor.js";

import { regexColors } from "../utils/array_colors.js";


//
/**
 * Récupération des Ids lu localStorage
 * @param {object} items Articles du localStorage
 * @returns {object[]} tabId : Tableau des Ids du localStorage
 */
const recupIdLocalStorage = (items) => {
    let tabId = [];
    for (let item of items)
        tabId.push(item.id);

    return tabId;
}

/**
 * Multiplication du prix par le nombre d'article
 * @param {Number} nbArticle 
 * @param {Number} price 
 * @returns {Number}
 */
let priceCumul = (nbArticle, price) => {
    return nbArticle * price;
}

/**
 * Tableau d'articles du localstorage
 * @param {object} jsonArticle
 * Objet contenant tous les articles de la base de données 
 * @param {object} recupLocalStorage
 *  Objet contenant tous les articles du localStorage
 * @returns {object[]} tabArticle : tableau de tableaux contenant :
 * @property {(number|string)} id article du localStorage
 * @property {String} couleur article du localStorage
 * @property {(number|string)} quantité article du localStorage
 * @property {Object} article de la base de données
 */
const funcTabArticle = (jsonArticle, recupLocalStorage) => {
    const tabArticle = [];
    for (let article of jsonArticle) {
        for (let loc of recupLocalStorage) {
            if (loc.id == article._id) {
                let test = [];
                test.push(loc.id);
                test.push(loc.color);
                test.push(loc.quantity);
                test.push(article);
                tabArticle.push(test);
            }
        }
    }
    return tabArticle;
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



console.log(getCart('cart'));
const products = recupIdLocalStorage(recupLocalStorage);
console.log(products);





for (let item of formInputTab) {

    item[0].addEventListener("input", () => {
        let name = nameValid(item[1], item[0].value, item[2], item[3]);
        activeButton(name, orderForm);
    })

}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let tests = [];
    for (let item of formInputTab) {
        let boolValue = nameValid(item[1], item[0].value, item[2], item[3]);
        item.push(boolValue)
        console.log(boolValue)
        console.log(form[item[4]].value)
        if (!boolValue) {
            tests.push(false);
            nameValid2(item[2], item[0], form[item[4]].value);
        }
        console.log(tests);
    }

    console.log(formInputTab)


    console.log(tests);
    if (tests.length === 0) {

        // let validForm = true;
        // for (let item in formObjs) {
        //     console.log(formObjs[item][0])
        //     if (!formObjs[item][0]) {
        //         validForm = false;
        //     }
        // }
        let validForm = true;
        for (let item of formInputTab) {
            console.log(item[item.length - 1])
            if (!item[item.length - 1]) {
                validForm = false;
            }
        }
        
        console.log("validForm" + validForm)

        for (let item in formObjs) {

            validForm ? (
                objValue.contact[item] = form[item].value,
                form[item].value = ""
                , console.log(form[item])
            ) :
                objValue = "";
        };
        validForm ? objValue.products = products :
            objValue = "";

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
            };

        }).then((value) => {
            console.log(value);
            let orderId = value.orderId;
            const url = new URL(window.location.href);
            console.log(url.origin);
            let route = '/front/html/confirmation.html';
            let confirm = (`${url.origin}${route}?orderid=${orderId}`);
            // window.location.href = confirm ;
            console.log(confirm);
        });

    }

    console.log(objValue);
    // objValue = {} ;
})


export { recupIdLocalStorage, priceCumul, funcTabArticle };