import { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, inputQuantityElt, regexName } from "./const.js"


import { recupId, priceCumul, funcTabArticle } from "./funct.js"

import { changeQuantity, removeProduct, changeQuantityTotal, changeTotalPrice } from "../utils/funct_localstor.js"

import { colorsKanap } from "../utils/array_colors.js"

import { displayImg } from "../utils/funct_globale.js"


console.log(recupLocalStorage)

console.log(recupId(recupLocalStorage))

console.log(regexName)


fetch(promise)
    .then(data => data.json())
    .then(jsonArticle => {
        console.log(jsonArticle)

        // Tableau d'articles du localstorage
        const tabArticle = funcTabArticle(jsonArticle, recupLocalStorage)
        console.log(tabArticle)

        let totalQuantity = 0
        let total = 0
        for (let item of tabArticle) {

            console.log(displayImg(item))

            let cumul = priceCumul(item[2], item[3].price)
            total += cumul
            totalQuantity += parseInt(item[2])


            cartItemsElt.innerHTML += `
                <article class="cart__item" data-id="${item[0]}" data-color="${item[1]}">
                    <div class="cart__item__img">
                        <img src="${displayImg(item)[0]}" alt="${displayImg(item)[1]}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${item[3].name}</h2>
                            <p>${item[1]}</p>
                            <p>${item[3].price},00 €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : ${item[2]}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item[2]}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
            `
            totalQuantityElt.innerHTML = totalQuantity

            totalPriceElt.innerText = total
        }

        for (let i = 0; i < tabArticle.length; i++) {

            let inputValue = document.querySelector(`#cart__items > article:nth-child(${i + 1}) input`)
            // let datasetId = document.querySelector(`#cart__items`).children[i].dataset.id
            let datasetId = inputValue.closest(`.cart__item`).dataset.id
            // let datasetColor = document.querySelector(`#cart__items`).children[i].dataset.color
            let datasetColor = inputValue.closest(`.cart__item`).dataset.color
            console.log(`${datasetId}, ${datasetColor}`)

            inputValue.addEventListener("change", () => {

                if (tabArticle[i][0] == datasetId && tabArticle[i][1] == datasetColor) {
                    // Changement de quantité dans le localstorage
                    changeQuantity(tabArticle[i], inputValue.value)
                    console.log(`Quantité de l'élément au chargement de la page : ${tabArticle[i][2]}`)

                    // Affichage de la nouvelle quantité sur la page
                    document.querySelector(`#cart__items > article:nth-child(${i + 1}) div.cart__item__content__settings__quantity > p`).innerText =
                        `Qté : ${inputValue.value}`

                    console.log(inputValue.value)

                    if (inputValue.value == 0)
                        cartItemsElt.removeChild(cartItemsElt.children[i])

                }

                console.log(changeQuantityTotal())
                totalQuantityElt.innerHTML = changeQuantityTotal()

                console.log(changeTotalPrice(tabArticle))
                totalPriceElt.innerText = changeTotalPrice(tabArticle)

            })

        }

        for (let i = 0; i < tabArticle.length; i++) {
            let deleteItem = document.querySelectorAll('p.deleteItem')[i]
            console.log(tabArticle[i][0])
            console.log(tabArticle[i][1])
            let dataId = deleteItem.closest(`.cart__item`).dataset.id
            let dataColor = deleteItem.closest(`.cart__item`).dataset.color
            console.log(dataId)
            console.log(dataColor)
            deleteItem.addEventListener('click', function () {
                if (tabArticle[i][0] == dataId && tabArticle[i][1] == dataColor) {
                    removeProduct(tabArticle[i])
                    cartItemsElt.removeChild(deleteItem.closest(`.cart__item`))
                    console.log(deleteItem.closest(`.cart__item`))
                    console.log(tabArticle[i][0])
                    console.log(tabArticle[i][1])

                    totalQuantityElt.innerHTML = changeQuantityTotal()
                    totalPriceElt.innerText = changeTotalPrice(tabArticle)

                }
            })
        }


    })
    