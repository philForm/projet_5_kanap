import { selectElt, inputElt, quantityLabel, buttonCartElt, url, promise } from "./const.js";

import { retrieveEltDom, funCartObj, orderedVerifications, functMaxQuantity, functDisabled } from "./funct.js";

import { recupId } from "../utils/funct_globale.js";

import { getCart, findArticle } from "../utils/funct_localstor.js";

console.log(recupId('id', url));
console.log(promise);

window.onload = () => {

    fetch(promise)
        .then(data => data.json())
        .then(article => {
            console.log(article);

            retrieveEltDom(article);

            let cartObj = funCartObj(article);
            console.log(cartObj);

            // console.log(cart);

            buttonCartElt.dataset.confirm = "0";
            buttonCartElt.dataset.color = "";
            buttonCartElt.dataset.quantity = "";
            buttonCartElt.dataset.bool = false;
            buttonCartElt.dataset.quantitymax = ""

            let quantityMax

            // /////////////////////////////////////////////////
            selectElt.addEventListener("input", (e) => {

                console.log(article._id);
                console.log(cartObj.id);
                console.log(article.name);
                console.log(selectElt.value);
                console.log(e.target.value);

                let foundProduct = findArticle(selectElt, cartObj);

                // console.log(foundProduct);

                // Le produit est déjà dans le localStorage
                if (foundProduct != undefined) {
                    console.log("je suis dans le if")
                    console.log(foundProduct);
                    console.log(foundProduct.quantity);

                    quantityMax = 100 - foundProduct.quantity;
                    buttonCartElt.dataset.quantitymax = quantityMax;
                    quantityLabel.innerText = `Nombre d'article(s) (1-${quantityMax}) :`;
                    inputElt.setAttribute("max", quantityMax);

                    // functMaxQuantity(100 - foundProduct.quantity, buttonCartElt, quantityLabel, inputElt)

                    // Si la quantité de produit est à son maximum, on désactive l'input et le bouton.
                    functDisabled(foundProduct, quantityLabel, inputElt, buttonCartElt);
                    // if (foundProduct.quantity === 100) {
                    //     console.log("désactivé")
                    //     quantityLabel.innerText = `Nombre d'article(s) (0) :`;
                    //     inputElt.disabled = true;
                    //     buttonCartElt.disabled = true;
                    //     buttonCartElt.classList.add("disabled");

                    // } else {
                    //     console.log("activé")
                    //     inputElt.disabled = false;
                    //     buttonCartElt.disabled = false;
                    //     buttonCartElt.classList.remove("disabled");
                    // }
                }

                // Le produit n'est pas présent dans le localStorage.
                else {
                    console.log("je suis dans le else")
                    quantityMax = 100;
                    buttonCartElt.dataset.quantitymax = quantityMax;
                    quantityLabel.innerText = `Nombre d'article(s) (1-${quantityMax}) :`;
                    inputElt.setAttribute("max", quantityMax);

                    // functMaxQuantity(100, buttonCartElt, quantityLabel, inputElt);

                    inputElt.value = 0

                }

            });

            inputElt.addEventListener("change", (e) => {
                // ///////////////////////////////////////

                let foundProduct = findArticle(selectElt, cartObj);

                // ///////////////////////////////////////
                console.log(foundProduct)
                if (foundProduct == undefined) {
                    quantityMax = 100;
                    console.log(quantityMax)
                    if (e.target.value > quantityMax) {
                        console.log("first")
                        alert(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                        console.log(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                        console.log(quantityMax)
                        inputElt.value = 0;
                        buttonCartElt.dataset.quantitymax = quantityMax;
                        // buttonCartElt.dataset.quantitymax = 0;
                    }
                    else {
                        console.log("deuz")
                        inputElt.setAttribute("value", e.target.value);
                        // buttonCartElt.dataset.quantitymax = quantityMax - e.target.value;
                        buttonCartElt.dataset.quantitymax = quantityMax;

                    }
                }
                if (foundProduct != undefined) {

                    quantityMax = 100 - foundProduct.quantity;

                    if (e.target.value > quantityMax) {
                        console.log(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                        alert(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                        inputElt.value = 0;
                        buttonCartElt.dataset.quantitymax = quantityMax;

                    } else {
                        // inputElt.value = e.target.value
                        inputElt.setAttribute("value", e.target.value);
                        // buttonCartElt.dataset.quantitymax = quantityMax - e.target.value;
                        buttonCartElt.dataset.quantitymax = quantityMax;


                    }

                }
            })

            buttonCartElt.addEventListener("click", () => {

                let foundProduct = findArticle(selectElt, cartObj);
                console.log(foundProduct);
                // Impossibilité d'envoyer les articles dans le localstorage si la quantité dépasse la quantité maximum.

                quantityMax = parseInt(buttonCartElt.dataset.quantitymax);
                console.log(quantityMax);
                if (inputElt.value <= quantityMax){
                    orderedVerifications(cartObj, article);
                    foundProduct = findArticle(selectElt, cartObj);
                    functDisabled(foundProduct, quantityLabel, inputElt, buttonCartElt);
                    // if (foundProduct != undefined) {
                    //     console.log(foundProduct.quantity)
                    //     if (foundProduct.quantity === 100) {
                    //         console.log("désactivé")
                    //         quantityLabel.innerText = `Nombre d'article(s) (0) :`;
                    //         inputElt.disabled = true;
                    //         buttonCartElt.disabled = true;
                    //         buttonCartElt.classList.add("disabled");

                    //     } else {
                    //         console.log("activé")
                    //         inputElt.disabled = false;
                    //         buttonCartElt.disabled = false;
                    //         buttonCartElt.classList.remove("disabled");
                    //     }
                    // }
                }
                    
                else {
                    alert(`Veuillez indiquer une quantité comprise entre 1 et ${quantityMax} !`);
                    console.log(`Veuillez indiquer une quantité comprise entre 1 et ${quantityMax} !`);
                    inputElt.value = 0;
                    
                }

            });

            // /////////////////////////////////////////////////



            console.log(cartObj);

        }).catch((err) => {
            console.error(err);
            alert("Les détails des produits que vous avez choisis ne peuvent être affichés !")
        });

};

