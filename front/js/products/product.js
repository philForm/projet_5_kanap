import { selectElt, inputElt, quantityLabel, buttonCartElt, url, promise, stock } from "./const.js";

import { retrieveEltDom, funCartObj, orderedVerifications, functMaxQuantity, functDisabled, blockQuantityToMax } from "./funct.js";

import { recupId } from "../utils/funct_globale.js";

import { findArticle } from "../utils/funct_localstor.js";

console.log(recupId('id', url));
console.log(promise);

window.onload = () => {

    fetch(promise)
        .then(data => data.json())
        .then(article => {
            console.log(article);
            
            // Les éléments de l'article récupéré par fetch sont injectés dans le DOM.
            retrieveEltDom(article);
            
            /**
             * objet contenant l'id et le nom de l'article.
             * @type {object}
             */
            let cartObj = funCartObj(article);
            console.log(cartObj);

            // Création des data-set qui vont servir à valider les différentes commandes grâce à des messages d'alert et de confirmations.
            buttonCartElt.dataset.confirm = "0";
            buttonCartElt.dataset.color = "";
            buttonCartElt.dataset.quantity = "";
            buttonCartElt.dataset.bool = false;
            buttonCartElt.dataset.quantitymax = ""


            selectElt.addEventListener("input", (e) => {

                console.log(article._id);
                console.log(cartObj.id);
                console.log(article.name);
                console.log(selectElt.value);
                console.log(e.target.value);
                
                let foundProduct = findArticle(selectElt, cartObj);

                let quantityMax = 0;

                foundProduct != undefined ?
                    quantityMax = stock - foundProduct.quantity :
                    (quantityMax = stock, inputElt.value = 0);

                functMaxQuantity(quantityMax, buttonCartElt, quantityLabel, inputElt);
                functDisabled(stock, foundProduct, quantityLabel, inputElt, buttonCartElt);

            });

            inputElt.addEventListener("change", (e) => {

                let foundProduct = findArticle(selectElt, cartObj);

                console.log(foundProduct)
                console.log(typeof e.target.value)
                let quantityMax = 0;

                foundProduct == undefined ?
                    quantityMax = stock : quantityMax = stock - foundProduct.quantity;

                blockQuantityToMax(quantityMax, e.target.value, inputElt, buttonCartElt)
            })

            buttonCartElt.addEventListener("click", () => {

                let foundProduct = findArticle(selectElt, cartObj);
                console.log(foundProduct);

                let quantityMax = parseInt(buttonCartElt.dataset.quantitymax);
                console.log(quantityMax);
                
                let message = `Veuillez indiquer une quantité comprise entre 1 et ${quantityMax} !`;

                if (inputElt.value > 0 && inputElt.value <= quantityMax) {
                    orderedVerifications(cartObj, article);
                    foundProduct = findArticle(selectElt, cartObj);
                    functDisabled(stock, foundProduct, quantityLabel, inputElt, buttonCartElt);
                }

                // Impossibilité d'envoyer les articles dans le localStorage si la quantité dépasse la quantité maximum.
                else {
                    alert(message);
                    inputElt.value = 0;
                }

            });

        }).catch((err) => {
            console.error(err);
            alert("Les détails des produits que vous avez choisis ne peuvent être affichés !")
        });

};

