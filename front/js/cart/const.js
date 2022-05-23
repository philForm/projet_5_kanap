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



export { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, inputQuantityElt }