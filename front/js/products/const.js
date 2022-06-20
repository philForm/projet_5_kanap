// import { recupId } from "./funct.js"
import { recupId } from "../utils/funct_globale.js"

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

const url = new URL(window.location.href);

// URL de l'API
const promise = `http://localhost:3000/api/products/${recupId('id', url)}`

export {
    titleHead,
    divImgElt,
    titleElt,
    priceElt,
    descriptElt,
    selectElt,
    inputElt,
    buttonCartElt,
    url,
    promise
}