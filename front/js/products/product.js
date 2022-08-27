import { inputElt, buttonCartElt, url, promise } from "./const.js";

import { recupEltDom, funCartObj, orderedVerifications } from "./funct.js";

import { recupId } from "../utils/funct_globale.js";

import { getCart } from "../utils/funct_localstor.js";

console.log(recupId('id', url));
console.log(promise);

window.onload = () => {

    fetch(promise)
        .then(data => data.json())
        .then(article => {
            console.log(article);

            recupEltDom(article);

            let cartObj = funCartObj(article);
            let cart = getCart('cart');

            console.log(cartObj);
            console.log(cart);

            // Création de data-set
            buttonCartElt.dataset.confirm = "0";
            buttonCartElt.dataset.color = "";
            buttonCartElt.dataset.quantity = "";
            buttonCartElt.dataset.bool = false;

            buttonCartElt.addEventListener("click", () => {
                // Impossibilité d'envoyer les articles dans le localStorage si la quantité dépasse 100
                if (inputElt.value <= 100)
                    orderedVerifications(cartObj, article);
                else {
                    alert("Veuillez indiquer une quantité comprise entre 1 et 100 !");
                    inputElt.value = 0;
                }
            });

            console.log(cartObj);

        }).catch((err) => {
            console.error(err);
            alert("Les détails des produits que vous avez choisis ne peuvent être affichés !")
        });

};

