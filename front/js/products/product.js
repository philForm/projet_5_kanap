import { inputElt, buttonCartElt, promise } from "./const.js";

import { retrieveEltDom, funCartObj, orderedVerifications } from "./funct.js";


window.onload = () => {

    fetch(promise)
        .then(data => data.json())
        .then(article => {
            
            // Les éléments de l'article récupéré par fetch sont injectés dans le DOM.
            retrieveEltDom(article);

            /**
             * objet contenant l'id et le nom de l'article.
             * @type {object}
             */
            let cartObj = funCartObj(article);

            // Création des data-set qui vont servir à valider les différentes commandes grâce à des messages d'alerte et de confirmation.
            buttonCartElt.dataset.confirm = "0";
            buttonCartElt.dataset.color = "";
            buttonCartElt.dataset.quantity = "";
            buttonCartElt.dataset.bool = false;

            buttonCartElt.addEventListener("click", () => {
                // Impossibilité d'envoyer les articles dans le localStorage si la quantité dépasse 100
                if (inputElt.value >= 0 && inputElt.value <= 100)
                    orderedVerifications(cartObj, article);
                else {
                    alert("Veuillez indiquer une quantité comprise entre 1 et 100 !");
                    // réinitialisation de l'input à 0 si la quantité maximum est dépassée.
                    inputElt.value = 0;
                }
            });

        }).catch((err) => {
            console.error(err);
            alert(`Les détails des produits que vous avez choisis ne peuvent être affichés ! ${err}`)
        });

};

