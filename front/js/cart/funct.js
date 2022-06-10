

// Récupération de l'Id
const recupId = (items) => {
    let tabId = []
    for (let item of items)
        tabId.push(item.id)

    return tabId
}

// Multiplication du prix par le nombre d'article
let priceCumul = (nbArticle, price) => {
    return nbArticle * price
}

// Récupération des données du formulaire à partir de l'url
const recupForm = () => {
    const url = new URL(window.location.href);
    console.log(url)
    const searchParams = new URLSearchParams(url.search);
    console.log(url.searchParams)
    const map = new Map()
    url.searchParams.forEach((value, key)=>{
        map.set(key, value)
    })
    return Object.fromEntries(map) // convertit un objet Map en Objet
}

export { recupId, priceCumul, recupForm }