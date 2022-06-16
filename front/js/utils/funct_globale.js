import { colorsKanap } from "./array_colors.js"

import { regexColors } from "./array_colors.js"



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
    if(colorImg){
        let imgUrl = `${imgUrlTab}_${colorImg}.jpg`
        return imgUrl    
    }else{
        let imgUrl = `${imgUrlTab}.jpg`
        return imgUrl    
    }
}

// Récupération du nom de la couleur en anglais
const engNameColor = (colorImg) => {
    if (colorImg) {
        let color = (colorsKanap.find(col => col[1] == colorImg))[0]
        return color
    } else
        console.log("La couleur n'existe pas !")
}

// Coupe le texte alternatif de l'image
// const splitAlternText = (art) => {
//     let altTab = art.altTxt.split(' ')
//     console.log(altTab)
//     return altTab
// }

// Remplacement de la couleur du texte alternatif de l'image
const replaceColor = (test, color, regex) => {
    const testRegex = test.match(regex)
    if (testRegex) {
        console.log(testRegex)
        for (let i = 0; i < testRegex.length; i++)
            test = test.replace(testRegex[i], color.trim())
    }
    return test
}

// 
const valueReplace = (value, color) => {

    if (value.length > 1) {
        color = color.replace("noir", "")
        color = color.replace("et", "")
        console.log(color)
    }
    return color
}

// Changement du nom de la couleur du texte alternatif de l'image
// const alternChangeColor = (altTab, art) => {
//     let textAlt = `${altTab[0]} ${altTab[1]} ${altTab[2]} ${art.trim()} ${altTab[altTab.length - 2]} ${altTab[altTab.length - 1]}`

//     return textAlt
// }

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

    // Coupe le texte alternatif de l'image
    // let splitText = splitAlternText(item[3])
    // console.log(splitText)

    // Changement texte alternatif
    // let textAlt = alternChangeColor(splitText, item[1])
    // console.log(textAlt)
    
    const color = valueReplace(item[3].altTxt, item[1])

    // Changement texte alternatif
    let textAlt2 = replaceColor(item[3].altTxt, color, regexColors)
    console.log(item[3].altTxt)
    console.log(textAlt2)

    return [imgUrl, textAlt2]
}

export { displayImg, displayImgIndex, engNameColor, splitColors, splitUrl, urlImagRestitute, replaceColor, valueReplace }