import * as cons from "./const.js"
import { colorsKanap } from "../utils/array_colors.js";
import { displayImgIndex, displayImg, engNameColor, splitColors, splitUrl, urlImagRestitute, alternChangeColor, splitAlternText } from "../utils/funct_globale.js";


// Récupération de l'id de l'article à partir de l'url
const recupId = (url, searchParams) => {
    // return window.location.search.split("=")[1]
    url = new URL(window.location.href);
    console.log(url)
    searchParams = new URLSearchParams(url.search);
    console.log(searchParams)
    if (searchParams.has("id"))
        return url.searchParams.get("id")
}

// Injection des éléments de l'api dans le DOM
const recupEltDom = (article) => {
    cons.titleHead.innerHTML = article.name
    cons.divImgElt.innerHTML = `
            <img src="${displayImgIndex(article)}" alt="${article.altTxt}">
            `
    cons.titleElt.innerText = article.name
    cons.priceElt.innerText = article.price
    cons.descriptElt.innerText = article.description

    for (let color of article.colors) {

        let colorTab = color.split("/")
        console.log(colorTab)
        let colorHtml = ''
        for (let color of colorTab) {

            // cherche la couleur color dans colorsKanap
            let color2 = (colorsKanap.find((col => col[0] == color.toLowerCase())))[1]
            console.log(color2)
            if (colorTab.indexOf(color) != colorTab.length - 1)
                colorHtml += `${color2} et`
            else
                colorHtml += ` ${color2}`
        }

        cons.selectElt.innerHTML += `
            <option value="${colorHtml}">${colorHtml}</option>
            `
    }


    // injection de la couleur choisie dans <select>
    cons.selectElt.addEventListener("input", (e) => {
        cons.selectElt.setAttribute("value", e.target.value)

        let value = (cons.selectElt.value).trim()
        value = value.split(' ')
        console.log(typeof value)
        console.log(value)


        console.log(value)

        // Récupère la valeur de la couleur
        let colorEng = engNameColor(value[value.length - 1])
        console.log(colorEng)

        let urlSplit = splitUrl(article)
        console.log(urlSplit)

        let imgURL = urlImagRestitute(urlSplit, colorEng)
        console.log(imgURL)

        let splitText = splitAlternText(article)
        console.log(splitText)

        let color = ''
        for (let val of value) {
            color += `${val} `
        }

        let textAlt = alternChangeColor(splitText, color)
        console.log(textAlt)

        cons.divImgElt.innerHTML = `
            <img src="${imgURL}" alt="${textAlt}">
        `

    })
    // Injection de la quantité choisie
    cons.inputElt.addEventListener("input", (e) => {
        cons.inputElt.setAttribute("value", e.target.value)
    })
}

// =======================================
export { recupId, recupEltDom }