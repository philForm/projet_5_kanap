import { colorsKanap, regexColors } from "./array_colors.js";


/**
 * Coupe l'URL de l'image au point de .jpg
 * @param {(URL|String)} art Url de l'image de l'article
 * @returns {(URL|String)} exemple : http:\/\/localhost:3000/images/kanap08
 */
const splitUrl = (art) => {
    let imgUrl = art.imageUrl.split('.')[0];
    return imgUrl;
}

/**
 * Coupe les couleurs multiples : exemple : noir et jaune
 * @param {String} art : Couleur à scinder 
 * @param {String} separ : Séparateur 
 * @returns {String} le dernier élément du tableau créé, dans l'exemple : jaune
 */
const splitColors = (art, separ) => {
    let colorImg = art.split(separ).pop();
    return colorImg;
}

//
/**
 * Reconstrution de l'URL de l'image
 * @param {(URL|String)} imgUrl URL de l'image coupée, exemple : http:\/\/localhost:3000/images/kanap08
 * @param {String} colorImg Couleur de l'image, exemple : pink
 * @returns {(URL|String)} URL de l'image, exemple : http:\/\/localhost:3000/images/kanap08_pink.jpg
 */
const urlImagRestitute = (imgUrl, colorImg) => {
    if (colorImg)
        return `${imgUrl}_${colorImg}.jpg`;

    return `${imgUrl}.jpeg`;

}



/**
 * Récupération du nom de la couleur en anglais, à partir du nom en français
 * @param {String} colorImg Couleur en français
 * @returns {String} Nom de la couleur en anglais
 */
const engNameColor = (colorImg) => {
    if (colorImg)
        return (colorsKanap.find(col => col[1] == colorImg))[0];

    // console.error("La couleur n'existe pas !");
}

/**
 * Remplacement de la couleur du texte alternatif de l'image
 * @param {String} test texte alternatif de l'image dans lequel on recherche une couleur de "regex"
 * @param {String} color couleur de remplacement
 * @param {RegExp} regex expression régulière contenant toutes les couleurs à tester sur "test"
 * @returns {String} texte alternatif après remplacement de la couleur
 */
const replaceColor = (test, color, regex) => {
    const testRegex = test.match(regex)
    if (testRegex) {
        for (let i = 0; i < testRegex.length; i++)
            test = test.replace(testRegex[i], color.trim());
    }
    return test;
}

/**
 * Cas particulier où "altTxt" contient "noir" et "et"
 * @param {object[]} altTxt
 * @param {String} color 
 * @returns {String} couleur unique (définie par un mot simple)
 */
const valueReplace = (altTxt, color) => {
    if (altTxt.length > 1 && altTxt.includes("noir") && altTxt.includes("et")) {
        color = color.replace("noir", "");
        color = color.replace("et", "");
    }
    return color;
}


/**
 * Affichage des images de base
 * @param {object} art 
 * @returns {URL|string} URL de l'image.
 */
const displayImgIndex = (art) => {

    return urlImagRestitute(splitUrl(art), splitColors(art.colors[0], '/'));

}

/**
 * Affichage des images selon la couleur
 * @param {object[]} item 
 * @returns {[String]} contient deux valeurs : l'URL de l'image, et le texte alternatif.
 */
const displayImg = (item) => {

    // Coupe l'URL de l'image au point de .jpg
    let imgUrlTab = splitUrl(item[3]);
    // Coupe les couleurs multiples
    let colorImg = splitColors(item[1], ' ');
    // Récupération du nom de la couleur en anglais
    let color2 = engNameColor(colorImg);
    // Reconstitution de l'URL de l'image
    let imgUrl = urlImagRestitute(imgUrlTab, color2);

    const color = valueReplace(item[3].altTxt, item[1])

    // Changement texte alternatif
    let textAlt = replaceColor(item[3].altTxt, color, regexColors);

    return [imgUrl, textAlt];
}

/**
 * Récupère l'identifiant (id) dans l'url
 * @param {String} id clé de l'identifiant
 * @param {object} url new URL(window.location.href)
 * @returns {String} identifiant que l'on passe dans l'url
 */
const recupId = (id, url) => {

    // instance de l'API URLSearchParams utilisant en argument la valeur correspondant à la propriété search de l'objet url.
    // URLSearchParams fournit un moyen d'obtenir les données dans les paramètres de requête d'URL.
    let params = new URLSearchParams(url.search);
    // La méthode has() vérifie si le paramètre "id" existe dans l’URL.
    if (params.has(id))
        // sa valeur peut être trouvée via la méthode get.
        return params.get(id);
}

export { displayImg, displayImgIndex, engNameColor, splitColors, splitUrl, urlImagRestitute, replaceColor, valueReplace, recupId };