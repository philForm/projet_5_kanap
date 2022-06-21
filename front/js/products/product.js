import { selectElt, inputElt, buttonCartElt, url, promise } from "./const.js"

import { recupEltDom, funCartObj, sendArticleToCart } from "./funct.js"

import { recupId } from "../utils/funct_globale.js"

import { getCart } from "../utils/funct_localstor.js"

console.log(recupId('id', url))
console.log(promise)

window.onload = () => {

    fetch(promise)
        .then(data => data.json())
        .then(article => {
            console.log(article)

            recupEltDom(article)

            let cartObj = funCartObj(article)

            console.log(getCart('cart'))


            buttonCartElt.addEventListener("click", () => {

                sendArticleToCart(selectElt, inputElt, cartObj)

            })

            console.log(cartObj)

        }).catch(err => {
            console.log(err)
        })

}

