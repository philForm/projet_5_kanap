import * as cons from "./const.js"

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
            <img src="${article.imageUrl[0]}" alt="${article.altTxt[0]}">
        `
    cons.titleElt.innerText = article.name
    cons.priceElt.innerText = article.price
    cons.descriptElt.innerText = article.description
    for (let color of article.colors)
        cons.selectElt.innerHTML += `
                <option value="${color}">${color}</option>
        `
    // injection de la couleur choisie dans <select>
    cons.selectElt.addEventListener("input", (e) => {
        // cons.selectElt.setAttribute("value", e.target.value)
        cons.selectElt.setAttribute("value", e.target.value)
        // Récupère la valeur de la couleur
        let value = cons.selectElt.value
        console.log(value)
        // Récupère l'index de position de la valeur de couleur dans le tableau
        let pos = article.colors.indexOf(value)
        console.log(pos)
        if (pos < 0) { pos = 0 }
        cons.divImgElt.innerHTML = `
            <img src="${article.imageUrl[pos]}" alt="${article.altTxt[pos]}">
        `



    })
    // Injection de la quantité choisie
    cons.inputElt.addEventListener("input", (e) => {
        cons.inputElt.setAttribute("value", e.target.value)
    })
}




// =======================================
export { recupId, recupEltDom }