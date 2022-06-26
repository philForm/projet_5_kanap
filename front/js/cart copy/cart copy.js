import { promise, recupLocalStorage, cartItemsElt, totalQuantityElt, totalPriceElt, inputQuantityElt } from "./const.js"

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

            totalPriceElt.innerText = total
        }

        for (let i = 0; i < tabArticle.length; i++) {

            let inputValue = document.querySelector(`#cart__items > article:nth-child(${i + 1}) input`)
            let datasetId = document.querySelector(`#cart__items`).children[i].dataset.id
            let datasetColor = document.querySelector(`#cart__items`).children[i].dataset.color

            inputValue.addEventListener("input", () => {

                let difference = 0
                let newTotalQuantity = 0
                let newTotalPrice = 0
                let ancientCumul = 0
                let newCumul = 0

                if (tabArticle[i][0] == datasetId && tabArticle[i][1] == datasetColor) {
                    // Changement de quantité dans le localstorage
                    changeQuantity(tabArticle[i], inputValue.value)
                    console.log(`Quantité de l'élément au chargement de la page : ${tabArticle[i][2]}`)

                    // ancientCumul = parseInt(priceCumul(tabArticle[i][2], tabArticle[i][3].price))
                    // Mise à jour du total prix de l'article
                    // newCumul = parseInt(priceCumul(inputValue.value, tabArticle[i][3].price))
                    // console.log(priceCumul(inputValue.value, tabArticle[i][3].price))
                    // Différence entre la nouvelle quantité et l'ancienne
                    difference = inputValue.value - tabArticle[i][2]
                    console.log(`difference entre la nouvelle et l'ancienne quantité : ${difference}`)
                    console.log(inputValue.value - tabArticle[i][2])
                    // Affichage de la nouvelle quantité sur la page
                    document.querySelector(`#cart__items > article:nth-child(${i + 1}) div.cart__item__content__settings__quantity > p`).innerText =
                        `Qté : ${inputValue.value}`

                    console.log(`Quantité totale au chargement de la page : ${totalQuantity}`)
                    console.log(`Quantité de l'élément au chargement de la page : ${tabArticle[i][2]}`)
                    console.log(`Quantité actuelle de l'élément : ${inputValue.value}`)
                    // nouveau total d'articles
                    newTotalQuantity = (totalQuantity - tabArticle[i][2]) + parseInt(inputValue.value)
                    
                    if (inputValue.value > tabArticle[i][2]) {
                        console.log("true")
                        totalQuantity = totalQuantity + 1
                    }else{
                        console.log("false")
                        totalQuantity = totalQuantity - 1
                    }

                    console.log(`nouveau total de quantités : ${newTotalQuantity}`)
                    // Nouveau total de prix
                    // newTotalPrice = (total - ancientCumul) + newCumul

                    totalQuantityElt.innerHTML = newTotalQuantity
                    // totalPriceElt.innerText = newTotalPrice
                }
            })
        }




    })