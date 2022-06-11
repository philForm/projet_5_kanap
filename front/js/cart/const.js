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
const firstNameForm = document.getElementById("firstName")
const lastNameForm = document.getElementById("lastName")
const addressForm = document.getElementById("address")
const cityForm = document.getElementById("city")
const emailForm = document.getElementById("email")
const orderForm = document.getElementById("order")

// Récupération du form
const form = document.querySelector(".cart__order__form").elements
console.log(form)
console.log(form.firstName.value)

// Expressions régulières
const validEmail = "^([\w\.\-] +)@([\w\-] +)((\.(\w) { 2, 3 }) +) $"





export { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, inputQuantityElt, firstNameForm, lastNameForm, addressForm, cityForm, emailForm, orderForm, form }