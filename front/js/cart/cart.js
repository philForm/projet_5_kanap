import { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, regexName, formInputTab, form } from "./const.js";

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
        .then(jsonArticle => {
            console.log(jsonArticle);

            /**
             * Tableau d'articles du localstorage
             * @type {object[]}
             */
            const tabArticle = funcTabArticle(jsonArticle, recupLocalStorage);
            console.log(tabArticle);

            return tabArticle;

        }).catch((err) => {
            console.error(err);
            alert(`Les details de votre panier ne peuvent être affichés ! ${err}`)

        }).then(tabArticle => {

            // Affichage des articles sur la page
            displayArticlesOnPage(tabArticle, cartItemsElt, totalQuantityElt, totalPriceElt);

            for (let item of tabArticle) {

                // index de item
                let indexItem = tabArticle.indexOf(item);

                // Sélection de l'input indiquant la quantité
                const inputValue = document.querySelector(`#cart__items > article:nth-child(${indexItem + 1}) input`);

                // sélection de la balise <p> de quantité
                const displayValue = document.querySelector(`#quantity-${indexItem + 1}`)

                // bouton de suppression d'un élément
                let deleteItem = document.getElementById(`delete-${indexItem + 1}`);
                console.log(deleteItem);
                console.log(item[0]);
                console.log(item[1]);


                // dataset correspondant à l'item
                let datasetId = inputValue.closest(`.cart__item`).dataset.id;
                let datasetColor = inputValue.closest(`.cart__item`).dataset.color;
                inputValue.setAttribute("data-color", item[1]);

                inputValue.addEventListener("change", (e) => {

                    // recherche de l'article dans tabArticle
                    let art = tabArticle.find(el => el[0] == datasetId && el[1] == datasetColor)
                    console.log(art)

                    // Changement de quantité dans le localStorage
                    changeQuantity(art, e.target.value);

                    if (e.target.value <= 0) {

                        let children = document.getElementById(`art-${indexItem + 1}`);
                        console.log(children);

                        confirmRemoveProduct(art, children, inputValue, cartItemsElt);

                    }
                    if (e.target.value > 100) {
                        e.target.value = "100"
                        changeQuantity(art, e.target.value);
                    }

                    // Affichage de la nouvelle quantité sur la page
                    displayValue.innerText = `Qté : ${e.target.value}`;

                    quantityAndPrice(totalQuantityElt, totalPriceElt, tabArticle)
                })


                deleteItem.addEventListener('click', () => {

                    confirmRemoveProduct(item, deleteItem.closest(`.cart__item`), inputValue, cartItemsElt)
                    console.log(deleteItem.closest(`.cart__item`));

                    quantityAndPrice(totalQuantityElt, totalPriceElt, tabArticle)

                })
            }

        }).catch((err) => {
            alert(err);
            console.error(err);
        })

    listenValuesInputOfForm(formInputTab);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formSubmit();
    });

}