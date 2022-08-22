import { activeButton, nameValid, nameValid2 } from "./formulaire_funct.js";

import { form, recupLocalStorage, formInputTab } from "./const.js";

import { getCart, removeProduct, changeQuantity } from "../utils/funct_localstor.js";

import { regexColors } from "../utils/array_colors.js";

import { displayImg } from "../utils/funct_globale.js";


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

/**
 * Affiche les articles provenant de l'API sur la page cart
 * @param {object[]} tab 
 * @param {HTMLElement} cartItem : section contenant tous les catégories d'articles.
 * @param {HTMLSpanElement} totalElt : span contenant le nombre total d'articles
 * @param {HTMLSpanElement} totalPriceElt : span contenant le prix total
 */
const displayArticlesOnPage = (tab, cartItem, totalElt, totalPriceElt) => {

    let totalQuantity = 0;
    let total = 0;
    for (let item of tab) {

        console.log(item)
        console.log(displayImg(item));

        let cumul = priceCumul(item[2], item[3].price);
        total += cumul;
        totalQuantity += parseInt(item[2]);

        // ////////////////////////////////////////////
        let articleElt = document.createElement("article");
        articleElt.className = "cart__item";
        articleElt.setAttribute("data-id", item[0]);
        articleElt.setAttribute("data-color", item[1])
        
        articleElt.innerHTML = `
                        <div class="cart__item__img">
                            <img src="${displayImg(item)[0]}" alt="${displayImg(item)[1]}">
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${item[3].name}</h2>
                                <p>${item[1]}</p>
                                <p>${item[3].price},00 €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : ${item[2]}</p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item[2]}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                        </div>
                        `;
                        
        cartItem.appendChild(articleElt);


        // ////////////////////////////////////////////
        
        totalElt.innerHTML = totalQuantity;
        totalPriceElt.innerText = total;
    }
}

/**
 * Confirmation de suppression d'un article.
 * @param {object[]} product 
 * @param {HTMLElement} children : enfant de cartItemsElt
 * @param {HTMLInputElement} inputValue : choix de la quantité de produit
 * @param {HTML} cartItemsElt : section contenant les articles
 */
const confirmRemoveProduct = (product, children, inputValue, cartItemsElt) => {
    let confirmation = false;
    confirmation = confirm(
        "Voulez-vous vraiment supprimer ce produit du panier ?"
    );
    if (confirmation) {
        removeProduct(product);
        cartItemsElt.removeChild(children);

    }
    else if (inputValue.value == 0) {
        inputValue.value = "1";
        changeQuantity(product, inputValue.value);
    }
}

export { recupIdLocalStorage, priceCumul, funcTabArticle, displayArticlesOnPage, confirmRemoveProduct };