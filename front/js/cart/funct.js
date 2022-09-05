import { activeButton, nameValid, nameValid2 } from "./formulaire_funct.js";

import { form, recupLocalStorage, formInputTab } from "./const.js";

import { getCart, removeProduct, changeQuantity, changeQuantityTotal, changeTotalPrice } from "../utils/funct_localstor.js";

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

    /**
     * quantité totale d'article(s)
     */
    let totalQuantity = 0;

    /**
     * prix total
     */
    let total = 0;

    // itération sur le tableau pour afficher les articles sur la page.
    for (let item of tab) {

        console.log(item)
        console.log(displayImg(item));
        
        /**
         * Index de item dans tab + 1
         */
        let indexOfItem = tab.indexOf(item) + 1;

        total += priceCumul(item[2], item[3].price);
        totalQuantity += parseInt(item[2]);

        let articleElt = document.createElement("article");
        articleElt.className = "cart__item";
        articleElt.id = `art-${indexOfItem}`
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
                                    <p id='quantity-${indexOfItem}'>Qté : ${item[2]}</p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item[2]}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem" id='delete-${indexOfItem}'>Supprimer</p>
                                </div>
                            </div>
                        </div>
                        `;

        cartItem.appendChild(articleElt);

        totalElt.innerHTML = totalQuantity;
        totalPriceElt.innerText = total;
    }
}

/**
 * Confirmation de suppression d'un article.
 * @param {object[]} product : article attendant une confirmation de suppression du localStorage et du DOM
 * @param {HTMLElement} children : enfant de cartItemsElt (article dans le dom en attente de confirmation de suppression)
 * @param {HTMLInputElement} inputValue : choix de la quantité de produit
 * @param {HTMLElement} cartItemsElt : section contenant les articles
 */
const confirmRemoveProduct = (product, children, inputValue, cartItemsElt) => {
    let confirmation = false;
    confirmation = confirm(
        "Voulez-vous vraiment supprimer ce produit du panier ?"
    );
    if (confirmation) {
        console.log(children)
        removeProduct(product);
        cartItemsElt.removeChild(children);

    }
    else if (inputValue.value <= 0) {
        inputValue.value = "1";
        changeQuantity(product, inputValue.value);

    }
}

/**
 * Injection sur la page panier de la quantité et du prix total
 * @param {HTMLSpanElement} quantity 
 * @param {HTMLSpanElement} price 
 * @param {object[]} tab : tableau contenant les articles injectés sur la page panier
 */
const quantityAndPrice = (quantity, price, tab)=>{
    quantity.innerHTML = changeQuantityTotal();
    price.innerText = changeTotalPrice(tab);
}

export { recupIdLocalStorage, priceCumul, funcTabArticle, displayArticlesOnPage, confirmRemoveProduct, quantityAndPrice };