import { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPrice, inputQuantityElt } from "./const.js"

import { recupId, priceCumul } from "./funct.js"

import { changeQuantity } from "../utils/funct_localstor.js"

console.log(recupLocalStorage)


console.log(recupId(recupLocalStorage))

fetch(promise)
    .then(data => data.json())
    .then(jsonArticle => {
        console.log(jsonArticle)
        // Tableau d'articles du localstorage
        const tabArticle = []
        for (let article of jsonArticle) {
            for (let loc of recupLocalStorage) {
                if (loc.id == article._id) {
                    let test = []
                    test.push(loc.id)
                    test.push(loc.color)
                    test.push(loc.quantity)
                    test.push(article)
                    tabArticle.push(test)

                }
            }
        }
        console.log(tabArticle)

        let totalQuantity = 0
        let total = 0
        for (let item of tabArticle) {
            let cumul = priceCumul(item[2], item[3].price)
            total += cumul
            totalQuantity += parseInt(item[2])

            // Récupération de l'index de position de la couleur séléctionnée dans le tableau colors provenant du backend. Le même index de position correspond aussi à l'image
            let pos = item[3].colors.indexOf(item[1])

            cartItemsElt.innerHTML += `
                <article class="cart__item" data-id="${item[0]}" data-color="${item[1]}">
                    <div class="cart__item__img">
                        <img src="${item[3].imageUrl[pos]}" alt="${item[3].altTxt[pos]}">
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

            totalPrice.innerText = total
        }

        const inputQuantityElt = []
        for (let i = 0; i < tabArticle.length; i++) {

            let inputValue = document.querySelector(`#cart__items > article:nth-child(${i + 1}) input`)
            let datasetId = document.querySelector(`#cart__items`).children[i].dataset.id
            let datasetColor = document.querySelector(`#cart__items`).children[i].dataset.color

            inputValue.addEventListener("input", () => {
                if (tabArticle[i][0] == datasetId && tabArticle[i][1] == datasetColor) {
                    changeQuantity(tabArticle[i], inputValue.value)
                    console.log(tabArticle[i][2])
                    priceCumul(inputValue.value, tabArticle[i][3].price)
                    console.log(priceCumul(inputValue.value, tabArticle[i][3].price))
                    
                    
                    let difference = inputValue.value - tabArticle[i][2]
                    console.log(difference)
                    // nouveau total d'articles
                    totalQuantity = totalQuantity + difference
                    console.log(totalQuantity)
                    total =  total + (difference * tabArticle[i][3].price)
                    console.log(total)
                    
                    totalQuantityElt.innerHTML = totalQuantity
                    totalPrice.innerText = total
                }
            })



        }




    })