import { getCart } from "../utils/funct_localstor.js";

// Appel API
const promise = `http://localhost:3000/api/products`;

const promiseOrder = `http://localhost:3000/api/products/order`;

/**
 * Articles du localStorage. 
 * Contient la fonction getCart("cart")
 * @type {object[]}
 */
const recupLocalStorage = getCart("cart");

/**
 * Récupération de section id="cart__items"
 * @type {HTMLElement}
 */
const cartItemsElt = document.getElementById("cart__items");

/**
 * Récupération de la span totalQuantity.
 * Contient la quantité totale des produits.
 * @type {HTMLSpanElement}
 */
const totalQuantityElt = document.getElementById("totalQuantity");

/**
 * Récupération de la span totalPrice.
 * Contient le prix total des produits.
 * @type {HTMLSpanElement}
 */
const totalPriceElt = document.getElementById("totalPrice");

/**
 * Récupération de l'input de quantité.
 * Permet de changer la quantité du produit dans le localStorage.
 * @type {HTMLInputElement}
 */
const inputQuantityElt = document.querySelector("#cart__items article:nth-child(1)");


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
 * Bouton de validation de commande
 * @type {HTMLButtonElement} : type : submit
 */
const orderForm = document.getElementById("order");

/**
 * Récupération du form.
 * Contient tous les champs du formulaire.
 * @type {HTMLFormElement}
 */
const form = document.querySelector(".cart__order__form");
console.log(form);
console.log(form.elements);

// Expressions régulières
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

const regexName =
    /^[a-zA-ZéèëêîïâàûüùçÉÈËÊÎÏÂÀÛÜÇ][a-zéèëêîïâàûüç]+([\-'\.\s]+[a-zA-ZéèëêîïâàûüùçÉÈËÊÎÏÂÀÛÜÇ][a-zéèëêîïâàûüç]+)?$/;

const regexCity = /^[a-zA-ZéèëêîïâàûüçÉÈËÊÎÏÂÀÛÜÇ\s,\.'\-]+$/ ;
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
    "Ville valide."
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
    promise, promiseOrder, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, inputQuantityElt, firstNameInput, firstNameError, lastNameInput, lastNameError, addressInput, addressError, cityInput, cityError, emailInput, emailError, orderForm, form, regexEmail, regexName, regexAdress, regexCity, formInputTab, formObjs
};