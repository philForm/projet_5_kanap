import { selectElt, inputElt, buttonCartElt, url, promise } from "./const.js"

import { recupEltDom, funCartObj } from "./funct.js"

import { recupId } from "../utils/funct_globale.js"

import { saveCart, getCart, addCart, removeProduct } from "../utils/funct_localstor.js"

console.log(recupId('id', url))
console.log(promise)

fetch(promise)
    .then(data => data.json())
    .then(article => {
        console.log(article)

        recupEltDom(article)

        let cartObj = funCartObj(article)

        console.log(getCart('cart'))

        // Envoie l'article dans le localstorage
        buttonCartElt.addEventListener("click", () => {
            if (selectElt.value != "" && inputElt.value != 0) {
                cartObj.color = selectElt.value
                cartObj.quantity = inputElt.value
                console.log(cartObj)
                addCart(cartObj)
            }
        })

        console.log(cartObj)

    }).catch(err =>{
        console.log(err)
    })
