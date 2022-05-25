import { colorsKanap } from "./array_colors.js"

const displayImgIndex = (art) => {

    // Coupe l'URL de l'image au point de .jpg
    let imgUrlTab = art.imageUrl.split('.')[0]
    console.log(imgUrlTab)
    
    // Coupe les couleurs multiples
    let colorImg = art.colors[0].split('/').pop()
    console.log(colorImg)

    // Reconstitution de l'URL de l'image
    let imgUrl = `${imgUrlTab}_${colorImg}.jpg`
    console.log(imgUrl)

    return imgUrl


}

// Affichage des images selon la couleur
const displayImg = (item) => {

    // Coupe l'URL de l'image au point de .jpg
    let imgUrlTab = item[3].imageUrl.split('.')[0]
    console.log(imgUrlTab)
    // Coupe les couleurs multiples
    let colorImg = item[1].split(' ').pop()
    console.log(colorImg)
    // Récupération du nom de la couleur en anglais
    let color2 = (colorsKanap.find(col => col[1] == colorImg))[0]
    console.log(color2)
    // Reconstitution de l'URL de l'image
    let imgUrl = `${imgUrlTab}_${color2}.jpg`
    console.log(imgUrl)

    let altTab = item[3].altTxt.split(' ')
    console.log(altTab)

    let textAlt = `${altTab[0]} ${altTab[1]} ${altTab[2]} ${item[1].trim()} ${altTab[altTab.length - 2]} ${altTab[altTab.length - 1]}`
    console.log(textAlt)

    return [imgUrl, textAlt]
}

export { displayImg, displayImgIndex }