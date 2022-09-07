import { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, formInputTab, form } from "./const.js";

import { funcTabArticle, displayArticlesOnPage, changeQuantityAndRemoveProduct } from "./funct.js";

import { formSubmit } from "./formulaire.js";

import { listenValuesInputOfForm } from "./formulaire_funct.js";


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

            changeQuantityAndRemoveProduct(tabArticle, cartItemsElt, totalQuantityElt, totalPriceElt);

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