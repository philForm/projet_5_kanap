import { selectElt, inputElt, buttonCartElt, promise } from "./const.js"

import { recupId, recupEltDom } from "./funct.js"

import { saveCart, getCart, addCart, removeProduct } from "../utils/funct_localstor.js"

console.log(recupId())
console.log(promise)

fetch(promise)
    .then(data => data.json())
    .then(article => {
        console.log(article)

        recupEltDom(article)


        let cartObj = new Object
        cartObj.name = article.name
        cartObj.id = article._id

        console.log(getCart('cart'))


        buttonCartElt.addEventListener("click", () => {
            if (selectElt.value != "" && inputElt.value != 0) {
                cartObj.color = selectElt.value
                cartObj.quantity = inputElt.value
                console.log(cartObj)
                addCart(cartObj)
            }
        })

        console.log(cartObj)

    })
