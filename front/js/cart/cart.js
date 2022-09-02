import { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, regexName, formInputTab, form } from "./const.js";

import { stock } from "../products/const.js"

import { recupIdLocalStorage, funcTabArticle, displayArticlesOnPage, confirmRemoveProduct, quantityAndPrice } from "./funct.js";

import { changeQuantity } from "../utils/funct_localstor.js";

import { formSubmit } from "./formulaire.js";

import { listenValuesInputOfForm } from "./formulaire_funct.js";

console.log(recupLocalStorage);
console.log(recupIdLocalStorage(recupLocalStorage));
console.log(regexName);

window.onload = () => {

    fetch(promise)
        .then(data => data.json())
        .catch((err) => {
            console.error(err);
            alert(`Les details de votre panier ne peuvent être affichés ! ${err}`)
        })
        .then(jsonArticle => {
            console.log(jsonArticle);

            /**
             * Tableau d'articles du localstorage
             * @type {object[]}
             */
            const tabArticle = funcTabArticle(jsonArticle, recupLocalStorage);
            console.log(tabArticle);

            // Affichage des articles sur la page
            displayArticlesOnPage(tabArticle, cartItemsElt, totalQuantityElt, totalPriceElt);

            for (let item of tabArticle) {

                /**
                 * index de l'article dans tabArticle
                 */
                const indexItem = tabArticle.indexOf(item);

                /**
                 * Sélection de l'input indiquant la quantité
                 * @type {HTMLInputElement} type number
                 */
                const inputValue = document.querySelector(`#cart__items > article:nth-child(${indexItem + 1}) input`);

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

                    if (e.target.value > stock) {
                        e.target.value = stock;
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
            };

        }).catch((err) => {
            alert(err);
            console.error(err);
        })

    listenValuesInputOfForm(formInputTab);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formSubmit();
    });

};