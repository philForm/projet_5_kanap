import { selectElt, inputElt, quantityLabel, buttonCartElt, url, promise } from "./const.js";

import { retrieveEltDom, funCartObj, orderedVerifications } from "./funct.js";

import { recupId } from "../utils/funct_globale.js";

import { getCart } from "../utils/funct_localstor.js";

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

            let quantityMax

            // /////////////////////////////////////////////////
            selectElt.addEventListener("input", (e) => {

                console.log(article._id);
                console.log(cartObj.id);
                console.log(article.name);
                console.log(selectElt.value);
                console.log(e.target.value);

                const cart = getCart('cart');
                console.log(cart);

                let foundProduct = cart.find(el =>
                (el.color == selectElt.value &&
                    el.id == cartObj.id));

                console.log(foundProduct);

                if (foundProduct != undefined) {
                    console.log("je suis dans le if")
                    console.log(foundProduct);
                    console.log(foundProduct.quantity);
                    quantityMax = 100 - foundProduct.quantity;
                    quantityLabel.innerText = `Nombre d'article(s) (1-${quantityMax}) :`;

                    inputElt.setAttribute("max", quantityMax);
                    // inputElt.addEventListener("change", (e) => {
                    //     inputElt.setAttribute("value", e.target.value);
                    //     if (foundProduct != undefined && e.target.value > quantityMax) {

                    //         console.log(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                    //         alert(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                    //     }
                    // })
                    if (foundProduct.quantity === 100) {
                        quantityLabel.innerText = `Nombre d'article(s) (0) :`;
                        inputElt.disabled = true;
                        buttonCartElt.disabled = true;
                        buttonCartElt.classList.add("disabled");

                    } else {
                        inputElt.disabled = false;
                        buttonCartElt.disabled = false;
                        buttonCartElt.classList.remove("disabled");
                    }
                }
                // if (foundProduct == undefined) {
                else {
                    console.log("je suis dans le else")
                    quantityMax = 100;
                    quantityLabel.innerText = `Nombre d'article(s) (1-${quantityMax}) :`;
                    inputElt.setAttribute("max", quantityMax);
                    inputElt.value = 0

                    // inputElt.addEventListener("change", (e) => {
                    //     quantityMax = 100;
                    //     console.log(quantityMax)
                    //     inputElt.setAttribute("value", e.target.value);
                    //     if (foundProduct == undefined && e.target.value > quantityMax) {

                    //         alert(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                    //         console.log(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                    //         console.log(quantityMax)
                    //     }
                    // })
                }

                // if (foundProduct.quantity === 100) {
                //     quantityLabel.innerText = `Nombre d'article(s) (0) :`;
                //     inputElt.disabled = true;
                //     buttonCartElt.disabled = true;
                //     buttonCartElt.classList.add("disabled");

                // } else {
                //     inputElt.disabled = false;
                //     buttonCartElt.disabled = false;
                //     buttonCartElt.classList.remove("disabled");
                // }



                // // Injection de la quantité choisie
                // inputElt.addEventListener("change", (e) => {
                //     console.log(foundProduct)
                //     if (foundProduct == undefined) {
                //         quantityMax = 100
                //         console.log(quantityMax)
                //         // e.target.value = quantityMax;
                //         inputElt.setAttribute("max", quantityMax);
                //         console.log(inputElt.value)
                //         if (e.target.value > quantityMax)
                //             alert(`La quantité doit être comprise entre 1 et ${quantityMax} !`)

                //     }
                //     else {
                //         quantityMax = 100 - foundProduct.quantity
                //         if (e.target.value > 0 && e.target.value <= quantityMax)
                //             inputElt.setAttribute("value", e.target.value);
                //         else {
                //             alert(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                //             // inputElt.value = quantityMax;
                //             inputElt.setAttribute("max", quantityMax);

                //             console.log(quantityMax)
                //         }
                //     }
                // });

                inputElt.addEventListener("change", (e) => {
                    console.log(foundProduct)
                    if (foundProduct == undefined) {
                        quantityMax = 100;
                        console.log(quantityMax)
                        if (e.target.value > quantityMax) {

                            alert(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                            console.log(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                            console.log(quantityMax)
                            inputElt.value = 0;
                        }
                        else {
                            // inputElt.value = e.target.value
                            inputElt.setAttribute("value", e.target.value);
                        }
                    }
                    if (foundProduct != undefined) {
                        if (e.target.value > quantityMax) {
                            console.log(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                            alert(`La quantité doit être comprise entre 1 et ${quantityMax} !`)
                            inputElt.value = 0;

                        } else {
                            // inputElt.value = e.target.value
                            inputElt.setAttribute("value", e.target.value);

                        }

                    }
                })

                
            });
            
            buttonCartElt.addEventListener("click", () => {
                // Impossibilité d'envoyer les articles dans le localstorage si la quantité dépasse la quantité maximum.
                
                console.log(quantityMax)
                
                if (inputElt.value <= quantityMax)
                    orderedVerifications(cartObj, article);
                else {
                    alert(`Veuillez indiquer une quantité comprise entre 1 et ${quantityMax} !`);
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

