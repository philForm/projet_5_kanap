import { getCart } from "../utils/funct_localstor.js";

/**
 * URL des produits de l'api
 * @type {(URL|String)}
 */
const promise = `http://localhost:3000/api/products`;

/**
 * URL de l'api pour la requête POST
 * @type {(URL|String)}
 */
const promiseOrder = `http://localhost:3000/api/products/order`;

/**
 * Articles du localstorage
 */
const recupLocalStorage = getCart("cart");

/**
 * Récupération de section id="cart__items"
 * @type {HTMLElement} : \<section\>
 */
const cartItemsElt = document.getElementById("cart__items");

/**
 * Récupération de la span totalQuantity
 * @type {HTMLSpanElement}
 */
const totalQuantityElt = document.getElementById("totalQuantity");

/**
 * Récupération de la span totalPrice
 * @type {HTMLSpanElement}
 */
const totalPriceElt = document.getElementById("totalPrice");

// /**
//  * Récupération de l'input de quantité
//  */
// const inputQuantityElt = document.querySelector("#cart__items article:nth-child(1)");

// console.log(inputQuantityElt);

// =================================================================
// FORMULAIRE
// =================================================================
// Récupération des éléments du formulaire de validation.
const firstNameInput = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameInput = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");
const addressInput = document.getElementById("address");
const addressError = document.getElementById("addressErrorMsg");
const cityInput = document.getElementById("city");
const cityError = document.getElementById("cityErrorMsg");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");

/**
 * Bouton de validation du formulaire
 * @type {HTMLButtonElement}
 */
const orderForm = document.getElementById("order");

/**
 * Récupération du form
 * @type {HTMLFormElement}
 */
const form = document.querySelector(".cart__order__form");
console.log(form.elements);

// Expressions régulières
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

const regexName =
    /^[a-zA-ZéèëêîïâàûüùçÉÈËÊÎÏÂÀÛÜÇ][a-zéèëêîïâàûüç]+([\-'\.\s]+[a-zA-ZéèëêîïâàûüùçÉÈËÊÎÏÂÀÛÜÇ][a-zéèëêîïâàûüç]+)?$/;

const regexCity = /^[a-zA-ZéèëêîïâàûüçÉÈËÊÎÏÂÀÛÜÇ\s,\.'\-]+$/;
// const regexCity =
// /^[a-zA-ZéèëêîïâàûüùçÉÈËÊÎÏÂÀÛÜÇ]+([\s,\.'\-]+[a-zA-ZéèëêîïâàûüùçÉÈËÊÎÏÂÀÛÜÇ]+)?$/;

const regexAdress = /^[a-z0-9éèëêîïâàûüùç\s,'\-]*$/i;

let firstNameMsg = [
    "Votre prénom n'est pas valide !",
    "Prénom valide."
];
let lastNameMsg = [
    "Votre nom n'est pas valide !",
    "Nom valide."
];
let addressMsg = [
    "Votre adresse n'est pas valide !",
    "Adresse valide."
];
let cityMsg = [
    "Cette ville n'existe pas !",
    "Nom de la ville valide."
];
let emmaiMsg = [
    "Cette adresse email n'est pas valide !",
    "Email valide"
];

const formInputTab = [
    [firstNameInput, regexName, firstNameError, firstNameMsg, "firstName"],
    [lastNameInput, regexName, lastNameError, lastNameMsg, "lastName"],
    [addressInput, regexAdress, addressError, addressMsg, "address"],
    [cityInput, regexCity, cityError, cityMsg, "city"],
    [emailInput, regexEmail, emailError, emmaiMsg, "email"]
];


const formObjs = {
    firstName: [
        [regexName, firstNameInput.value, firstNameError],
        firstNameError
    ],
    lastName: [
        [regexName, lastNameInput.value, lastNameError],
        lastNameError
    ],
    address: [
        [regexAdress, addressInput.value, addressError],
        addressError
    ],
    city: [
        [regexCity, cityInput.value, cityError],
        cityError
    ],
    email: [
        [regexEmail, emailInput.value, emailError],
        emailError
    ]
};


export {
    promise, promiseOrder, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, firstNameInput, firstNameError, lastNameInput, lastNameError, addressInput, addressError, cityInput, cityError, emailInput, emailError, orderForm, form, regexEmail, regexName, regexAdress, regexCity, formInputTab, formObjs
};