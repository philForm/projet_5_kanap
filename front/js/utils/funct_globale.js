import { colorsKanap } from "./array_colors.js"


// Coupe l'URL de l'image au point de .jpg
const splitUrl = (art) => {
    let imgUrlTab = art.imageUrl.split('.')[0]
    return imgUrlTab
}

// Coupe les couleurs multiples
const splitColors = (art, separ) => {
    let colorImg = art.split(separ).pop()
    return colorImg
}

// Reconstitution de l'URL de l'image
const urlImagRestitute = (imgUrlTab, colorImg) => {
    let imgUrl = `${imgUrlTab}_${colorImg}.jpg`
    return imgUrl
}

// Récupération du nom de la couleur en anglais
const engNameColor = (colorImg)=>{
    let color = (colorsKanap.find(col => col[1] == colorImg))[0]
    return color
}

// Changement du nom de la couleur du texte alternatif de l'image
const alternChangeColor = (art)=>{
    
    let altTab = art[3].altTxt.split(' ')
    console.log(altTab)
    
    let textAlt = `${altTab[0]} ${altTab[1]} ${altTab[2]} ${art[1].trim()} ${altTab[altTab.length - 2]} ${altTab[altTab.length - 1]}`
    
    return textAlt
}

// Affichage des images de base
const displayImgIndex = (art) => {

    return urlImagRestitute(splitUrl(art), splitColors(art.colors[0], '/'))

}

// Affichage des images selon la couleur
const displayImg = (item) => {

    // Coupe l'URL de l'image au point de .jpg
    let imgUrlTab = splitUrl(item[3])
    console.log(imgUrlTab)
    // Coupe les couleurs multiples
    let colorImg = splitColors(item[1], ' ')
    console.log(colorImg)
    // Récupération du nom de la couleur en anglais
    let color2 = engNameColor(colorImg)
    console.log(color2)
    // Reconstitution de l'URL de l'image
    let imgUrl = urlImagRestitute(imgUrlTab, color2)
    console.log(imgUrl)
    // Changement texte alternatif
    let textAlt = alternChangeColor(item)
    console.log(textAlt)

    return [imgUrl, textAlt]
}

export { displayImg, displayImgIndex, engNameColor, splitColors, splitUrl }