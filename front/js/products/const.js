import { recupId } from "./funct.js"

// sélection de la balise meta title
const titleHead = document.querySelector("head > title")
// Sélection du container de l'image
const divImgElt = document.querySelector(".item__img")
// Sélection du h1 titre
const titleElt = document.getElementById("title")
// Sélection du span contenant le prix
const priceElt = document.getElementById("price")
// Sélection du p contenant la description
const descriptElt = document.getElementById("description")
// Sélection de select contenant les couleurs
const selectElt = document.getElementById("colors")
// Sélection de input quantité
const inputElt = document.getElementById("quantity")
// Sélection button ajouter au panier
const buttonCartElt = document.getElementById("addToCart")

// URL de l'API
const promise = `http://localhost:3000/api/products/${recupId()}`

export {
    titleHead,
    divImgElt,
    titleElt,
    priceElt,
    descriptElt,
    selectElt,
    inputElt,
    buttonCartElt,
    promise
}