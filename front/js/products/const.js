import { recupId } from "../utils/funct_globale.js";

/**
 * sélection de la balise title
 * @type {HTMLHeadElement} \<title>Nom du produit</title\>
 */
const titleHead = document.querySelector("head > title");
/**
 * Sélection du container de l'image
 * @type {HTMLDivElement} \<div class="item__img"\>
 */
const divImgElt = document.querySelector(".item__img");
/**
 * Sélection du h1 titre
 * @type {HTMLTitleElement} \<h1 id="title"\>
 */
const titleElt = document.getElementById("title");
/**
 * Sélection du span contenant le prix
 * @type {HTMLSpanElement} \<span id="price"\>
 */
const priceElt = document.getElementById("price");
/**
 * Sélection du p contenant la description
 * @type {HTMLParagraphElement} \<p id="description"\>
 */
const descriptElt = document.getElementById("description");
/**
 * Sélection de select contenant les options de couleurs
 * @type {HTMLSelectElement} \<select name="color-select" id="colors"\>
 */
const selectElt = document.getElementById("colors");

/**
 * @type {HTMLLabelElement} \<label for="itemQuantity" id="quantityLabel">Nombre d'article(s) (1-100) :
 */
const quantityLabel = document.getElementById("quantityLabel");

/**
 * Sélection de input contenant la quantité choisie
 * @type {HTMLInputElement} \<input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity"\>
 */
const inputElt = document.getElementById("quantity");

/**
 * Sélection button : ajouter au panier
 * @type {HTMLButtonElement} \<button id="addToCart"\>Ajouter au panier\</button\>
 */
const buttonCartElt = document.getElementById("addToCart");

/**
 * Instance de l'Objet : URL
 * @type {(object|URL)}
 */
const url = new URL(window.location.href);

/**
 * URL de l'API
 * @type {(url|String)}
 */
const promise = `http://localhost:3000/api/products/${recupId('id', url)}`;

export {
    titleHead, divImgElt, titleElt, priceElt, descriptElt, selectElt, quantityLabel, inputElt, buttonCartElt, url, promise
};