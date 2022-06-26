import { activeButton, nameValid, nameValid2 } from "./formulaire_funct.js";

import { form, recupLocalStorage, formInputTab } from "./const.js";

import { getCart } from "../utils/funct_localstor.js";

import { regexColors } from "../utils/array_colors.js";


/**
 * Récupération des Ids du localStorage
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
 * @param {object} jsonArticle Objet contenant tous les articles de la base de données 
 * @param {object} recupLocalStorage Objet contenant tous les articles du localStorage
 * @returns {object[]} tabArticle : tableau de tableaux contenant :
 * @type {(number|string)} id article du localStorage
 * @type {String} couleur article du localStorage
 * @type {(number|string)} quantité d'article(s) du localStorage
 * @type {Object} article de la base de données
 */
function funcTabArticle(jsonArticle, recupLocalStorage) {
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
const productsId = recupIdLocalStorage(recupLocalStorage);
console.log(productsId);



/**
 * Ecoute les changements en direct des champs du formulaire de validation de commande.
 * @param {object[]} tab tableau de tableaux contenant chacun :
 * @type {HTMLInputElement} exemple : \<input type="text" name="firstName" id="firstName" required=""\>
 * @type {RegExp}
 * @type {HTMLParagraphElement} exemple : <p id="firstNameErrorMsg">
 * @type {object[]} contient deux strings : textes de validation
 * @type {String} correspond à la valeur de l'Id de l'\<input\>
 */
function listenValuesInputOfForm(tab) {
    for (let item of tab) {
        item[0].addEventListener("input", () => {
            let name = nameValid(item[1], item[0].value, item[2], item[3]);
            // activeButton(name, orderForm);
        });
    }
}

/**
 * Teste la validité des champs du formulaire de commande lors de la soumission, et charge un message de validation pour chaque champ.
 * @param {object[]} tab tableau de tableaux contenant chacun :
 * @type {HTMLInputElement} exemple : \<input type="text" name="firstName" id="firstName" required=""\>
 * @type {RegExp}
 * @type {HTMLParagraphElement} exemple : <p id="firstNameErrorMsg">
 * @type {object[]} contient deux strings : textes de validation
 * @type {String} correspond à la valeur de l'Id de l'\<input\>
 * @returns {object[]} Vide si le formulaire est valide
 */
function validityOfFormOnSubmit(tab) {

    let tests = [];
    for (let item of tab) {
        let boolValue = nameValid(item[1], item[0].value, item[2], item[3]);
        item.push(boolValue);
        console.log(boolValue);
        console.log(form[item[4]].value);
        if (!boolValue) {
            tests.push(false);
            nameValid2(item[2], item[4], form[item[4]].value);
        }
        // if (typeof item[item.length - 1] === 'boolean')
        //     item.pop()
    }
    console.log(tests);
    return tests;

}

/**
 * Création de l'Objet envoyé par la méthode POST au backend
 * @param {boolean}  validForm 
 * @param {object} tab 
 * @param {object} products : Tableau d'Ids des produits du localStorage
 * @returns {object} Contient les informations provenant du formulaire de validation, et les produits du localStorage 
 */
function objectSend(validForm, tab, products) {
    const objValue = {
        contact: {},
    };

    for (let item of tab) {

        validForm ? (
            objValue.contact[item[4]] = form[item[4]].value,
            form[item[4]].value = ""
            , console.log(form[item[4]])
        ) :
            objValue = "";
    };

    validForm ? objValue.products = products :
        objValue = "";

    return objValue;

}

/**
 * Renvoie un boolean, true si le formulaire est valide
 * @param {object} tab 
 * @returns {boolean} 
 */
function validFormBool(tab) {
    let validForm = true;
    for (let item of tab) {
        console.log(item[item.length - 1]);
        if (!item[item.length - 1]) {
            validForm = false;
        }
        while (typeof item[item.length - 1] === 'boolean')
            item.pop();
    }
    return validForm;
}

listenValuesInputOfForm(formInputTab);


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let tests = validityOfFormOnSubmit(formInputTab)
    console.log(formInputTab)


    console.log(tests);
    if (tests.length === 0) {

        const validForm = validFormBool(formInputTab)
        
        console.log("validForm" + validForm)
        console.log(formInputTab)

        const objValue = objectSend(validForm, formInputTab, productsId)

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

    // console.log(objValue);
    // objValue = {} ;
})


export { recupIdLocalStorage, priceCumul, funcTabArticle };