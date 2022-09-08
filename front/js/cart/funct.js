import { removeProduct, changeQuantity, changeQuantityTotal, changeTotalPrice, getCart } from "../utils/funct_localstor.js";

import { displayImg } from "../utils/funct_globale.js";


/**
 * Récupération des Ids du localStorage
//  * @param {object} items Articles du localStorage
 * @returns {object[]} tabId : Tableau des Ids du localStorage
 */
const recupIdLocalStorage = () => {
    let tabId = [];
    const cart = getCart("cart");
    for (let item of cart)
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
 * Tableau d'articles du localStorage
 * @param {object[]} articles tableau d'objets contenant tous les articles de la base de données 
 * @returns {object[]} tabArticle : tableau de tableaux contenant :
 * @type {(number|string)} id article du localStorage
 * @type {String} couleur article du localStorage
 * @type {(number|string)} quantité d'article(s) du localStorage
 * @type {Object} article de la base de données
 */
function funcTabArticle(articles) {
    const tabArticle = [];
    const cart = getCart("cart");
    for (let article of articles) {
        for (let art of cart) {
            if (art.id == article._id) {
                let tab = [];
                tab.push(art.id);
                tab.push(art.color);
                tab.push(art.quantity);
                tab.push(article);
                tabArticle.push(tab);
            }
        }
    }
    return tabArticle;
}

/**
 * Affiche les articles provenant de l'API sur la page cart
 * @param {object[]} tab : tableau contenant les articles du localStorage
 * @param {HTMLElement} cartItem : section contenant toutes les catégories d'articles.
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

    const fragment = new DocumentFragment()

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
                                    <input  id='input-quantity-${indexOfItem}' type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item[2]}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem" id='delete-${indexOfItem}'>Supprimer</p>
                                </div>
                            </div>
                        </div>
                        `;

        fragment.appendChild(articleElt);

        totalElt.innerHTML = totalQuantity;
        totalPriceElt.innerText = total;
    }

    cartItem.appendChild(fragment);
}

/**
 * Modifie la quantité d'un article ou le supprime lors d'un événement.
 * @param {object[]} tabArticle : tableau contenant les articles du localStorage
 * @param {HTMLElement} cartItemsElt : section contenant toutes les catégories d'articles. 
 * @param {HTMLSpanElement} totalQuantityElt : span indiquant la quantité totale d'articles.
 * @param {HTMLSpanElement} totalPriceElt : span indiquant le prix total.
 */
const changeQuantityAndRemoveProduct = (tabArticle, cartItemsElt, totalQuantityElt, totalPriceElt) => {

    for (let item of tabArticle) {

        /**
         * index de l'article dans tabArticle
         */
        const indexItem = tabArticle.indexOf(item);

        /**
         * Sélection de l'input indiquant la quantité
         * @type {HTMLInputElement} type number
         */
        const inputValue = document.querySelector(`#input-quantity-${indexItem + 1}`);

        /**
         * sélection de la balise \<p\> de quantité
         * @type {HTMLParagraphElement}
         */
        const displayValue = document.querySelector(`#quantity-${indexItem + 1}`);

        /**
         * sélection de la balise \<article\>
         * @type {HTMLElement}
         */
        const children = document.getElementById(`art-${indexItem + 1}`);
        console.log(children);

        /**
         * bouton de suppression d'un élément
         * @type {HTMLButtonElement}
         */
        const deleteItem = document.getElementById(`delete-${indexItem + 1}`);

        /**
         * id de l'article contenu dans data-id de la balise \<article\>
         */
        const datasetId = inputValue.closest(`.cart__item`).dataset.id;

        /**
         * couleur de l'article contenu dans data-color de la balise \<article\>
         */
        const datasetColor = inputValue.closest(`.cart__item`).dataset.color;

        inputValue.setAttribute("data-color", item[1]);

        /**
         * recherche de l'article dans tabArticle
         */
        const art = tabArticle.find(el => el[0] == datasetId && el[1] == datasetColor)
        console.log(art)

        inputValue.addEventListener("change", (e) => {

            // Changement de quantité dans le localStorage
            changeQuantity(art, e.target.value);

            if (e.target.value <= 0)
                confirmRemoveProduct(art, children, inputValue, cartItemsElt);

            if (e.target.value > 100) {
                e.target.value = "100";
                changeQuantity(art, e.target.value);
            }

            // Affichage de la nouvelle quantité sur la page
            displayValue.innerText = `Qté : ${e.target.value}`;

            quantityAndPrice(totalQuantityElt, totalPriceElt, tabArticle);
        });

        deleteItem.addEventListener('click', () => {

            confirmRemoveProduct(item, deleteItem.closest(`.cart__item`), inputValue, cartItemsElt);
            console.log(deleteItem.closest(`.cart__item`));

            quantityAndPrice(totalQuantityElt, totalPriceElt, tabArticle);

        });

    }
};

/**
 * Confirmation de suppression d'un article.
 * @param {object[]} product : article attendant une confirmation de suppression du localStorage et du DOM
 * @param {HTMLElement} children : enfant de cartItemsElt (article dans le DOM en attente de confirmation de suppression)
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
const quantityAndPrice = (quantity, price, tab) => {
    quantity.innerHTML = changeQuantityTotal();
    price.innerText = changeTotalPrice(tab);
}

export { recupIdLocalStorage, priceCumul, funcTabArticle, displayArticlesOnPage, changeQuantityAndRemoveProduct, confirmRemoveProduct, quantityAndPrice };