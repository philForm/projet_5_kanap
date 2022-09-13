import { promise, cartItemsElt, totalQuantityElt, totalPriceElt, formInputTab, form } from "./const.js";

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

            /**
             * Tableau d'articles du localStorage
             * @type {object[]}
             */
            const tabArticle = funcTabArticle(jsonArticle);
            console.log(tabArticle)
            

            // Affichage des articles sur la page
            displayArticlesOnPage(tabArticle, cartItemsElt, totalQuantityElt, totalPriceElt);
            
            // Modifie la quantité d'un article ou le supprime lors d'un événement.
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