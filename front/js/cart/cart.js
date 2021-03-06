import { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, regexName, formInputTab, form } from "./const.js";

import { recupIdLocalStorage, funcTabArticle, displayArticlesOnPage } from "./funct.js";

import { changeQuantity, removeProduct, changeQuantityTotal, changeTotalPrice } from "../utils/funct_localstor.js";

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
            alert("Les details de votre panier ne peuvent être affichés !")
        }).then(tabArticle => {

            displayArticlesOnPage(tabArticle, cartItemsElt, totalQuantityElt, totalPriceElt);
            return tabArticle;

        }).then(tabArticle => {

            for (let i = 0; i < tabArticle.length; i++) {

                let inputValue = document.querySelector(`#cart__items > article:nth-child(${i + 1}) input`);
                let datasetId = inputValue.closest(`.cart__item`).dataset.id;
                let datasetColor = inputValue.closest(`.cart__item`).dataset.color;
                console.log(`${datasetId}, ${datasetColor}`);

                inputValue.addEventListener("change", () => {

                    if (tabArticle[i][0] == datasetId && tabArticle[i][1] == datasetColor) {
                        // Changement de quantité dans le localstorage
                        changeQuantity(tabArticle[i], inputValue.value);
                        console.log(`Quantité de l'élément au chargement de la page : ${tabArticle[i][2]}`);

                        // Affichage de la nouvelle quantité sur la page
                        document.querySelector(`#cart__items > article:nth-child(${i + 1}) div.cart__item__content__settings__quantity > p`).innerText =
                            `Qté : ${inputValue.value}`;

                        console.log(inputValue.value);
                        let confirmation
                        if (inputValue.value == 0) {

                            confirmation = confirm(
                                "Voulez-vous vraiment supprimer ce produit ?"
                            )
                            if (confirmation) {
                                removeProduct(tabArticle[i]);
                                cartItemsElt.removeChild(cartItemsElt.children[i]);

                            }
                            else {
                                inputValue.value = "1"
                                changeQuantity(tabArticle[i], inputValue.value);
                            }
                        }

                    }

                    console.log(changeQuantityTotal());
                    totalQuantityElt.innerHTML = changeQuantityTotal();

                    console.log(changeTotalPrice(tabArticle));
                    totalPriceElt.innerText = changeTotalPrice(tabArticle);

                })

            }
            return tabArticle;

        }).then(tabArticle => {

            for (let i = 0; i < tabArticle.length; i++) {
                let deleteItem = document.querySelectorAll('p.deleteItem')[i];
                console.log(tabArticle[i][0]);
                console.log(tabArticle[i][1]);
                let dataId = deleteItem.closest(`.cart__item`).dataset.id;
                let dataColor = deleteItem.closest(`.cart__item`).dataset.color;
                console.log(dataId);
                console.log(dataColor);
                deleteItem.addEventListener('click', function () {
                    if (tabArticle[i][0] == dataId && tabArticle[i][1] == dataColor) {
                        removeProduct(tabArticle[i]);
                        cartItemsElt.removeChild(deleteItem.closest(`.cart__item`));
                        console.log(deleteItem.closest(`.cart__item`));
                        console.log(tabArticle[i][0]);
                        console.log(tabArticle[i][1]);

                        totalQuantityElt.innerHTML = changeQuantityTotal();
                        totalPriceElt.innerText = changeTotalPrice(tabArticle);

                    }
                })
            }
        }).catch((err) => {
            console.error(err);
        })

    listenValuesInputOfForm(formInputTab);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formSubmit();
    });

}