import { getCart } from "../utils/funct_localstor.js"

// Appel API
const promise = `http://localhost:3000/api/products`

// Articles du localstorage
const recupLocalStorage = getCart("cart")

// Récupération de section id="cart__items"
const cartItemsElt = document.getElementById("cart__items")

// Récupération de la span totalQuantity
const totalQuantityElt = document.getElementById("totalQuantity")

// Récupération de la span totalPrice
const totalPriceElt = document.getElementById("totalPrice")

// Récupération de l'input de quantité
const inputQuantityElt = document.querySelector("#cart__items article:nth-child(1)")

console.log(inputQuantityElt)


// =================================================================
// FORMULAIRE
// =================================================================
// Récupération des éléments du formulaire de validation.
const firstNameInput = document.getElementById("firstName")
const firstNameError = document.getElementById("firstNameErrorMsg")
const lastNameInput = document.getElementById("lastName")
const lastNameError = document.getElementById("lastNameErrorMsg")
const addressInput = document.getElementById("address")
const addressError = document.getElementById("addressErrorMsg")
const cityInput = document.getElementById("city")
const cityError = document.getElementById("cityErrorMsg")
const emailInput = document.getElementById("email")
const emailError = document.getElementById("emailErrorMsg")

// Bouton de validation
const orderForm = document.getElementById("order")

// Récupération du form
const form = document.querySelector(".cart__order__form").elements
console.log(form)
console.log(form.firstName.value)

// Expressions régulières
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

const regexName =
    /^[a-zA-ZéèëêîïâàûüçÉÈËÊÎÏÂÀÛÜÇ][a-zéèëêîïâàûüç]+([\-'\.\s]+[a-zA-ZéèëêîïâàûüçÉÈËÊÎÏÂÀÛÜÇ][a-zéèëêîïâàûüç]+)?$/;
    
// const regexCity = /^[a-zA-ZéèëêîïâàûüçÉÈËÊÎÏÂÀÛÜÇ\s,\.'\-]+$/ ;
const regexCity = 
    /^[a-zA-ZéèëêîïâàûüçÉÈËÊÎÏÂÀÛÜÇ]+([\s,\.'\-]+[a-zA-ZéèëêîïâàûüçÉÈËÊÎÏÂÀÛÜÇ])?$/ ;

const regexAdress = /^[a-z0-9éèëêîïâàûüç\s,'\-]*$/i;




export { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, inputQuantityElt, firstNameInput, firstNameError, lastNameInput, lastNameError, addressInput, addressError, cityInput, cityError, emailInput, emailError, orderForm, form, regexEmail, regexName, regexAdress, regexCity }