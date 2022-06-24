import * as cons from "./const.js";
import { colorsKanap, regexColors } from "../utils/array_colors.js";
import { displayImgIndex, engNameColor, splitUrl, urlImagRestitute, replaceColor, valueReplace } from "../utils/funct_globale.js";
import { addCart } from "../utils/funct_localstor.js";


/**
 * Injection des éléments de l'article récupéré de l'api dans le DOM
 * @param {object} article 
 */
const recupEltDom = (article) => {
    cons.titleHead.innerHTML = article.name;
    cons.divImgElt.innerHTML = `
            <img src="${displayImgIndex(article)}" alt="${article.altTxt}">
            `;
    cons.titleElt.innerText = article.name;
    cons.priceElt.innerText = article.price;
    cons.descriptElt.innerText = article.description;


    let colorHtml = ""
    for (let color of article.colors) {

        let colorTab = color.split("/")
        console.log(colorTab);
        colorHtml = '';
        for (let color of colorTab) {

            // cherche la couleur color dans colorsKanap
            let color2 = (colorsKanap.find((col => col[0] == color.toLowerCase())))[1];
            console.log(color2);
            if (colorTab.indexOf(color) != colorTab.length - 1)
                colorHtml += `${color2} et`;
            else
                colorHtml += ` ${color2}`;

        };


        cons.selectElt.innerHTML += `
        <option value="${colorHtml}">${colorHtml}</option>
        
        `;
    };

    /**
    * injection de la couleur choisie dans <select>
    */
    cons.selectElt.addEventListener("input", (e) => {
        cons.selectElt.setAttribute("value", e.target.value);

        let value = (cons.selectElt.value).trim();
        value = value.split(' ');
        console.log(typeof value);
        console.log(value);


        // Récupère la valeur de la couleur
        let colorEng = engNameColor(value[value.length - 1]);
        console.log(colorEng);

        let urlSplit = splitUrl(article);
        console.log(urlSplit);
        console.log(typeof urlSplit);

        let imgURL = urlImagRestitute(urlSplit, colorEng);
        console.log(imgURL);


        let color = '';
        for (let val of value) {
            color += `${val} `;
        }
        
        color = valueReplace(value, color);

        let textAlt2 = replaceColor(article.altTxt, color, regexColors);
        console.log(textAlt2);

        cons.divImgElt.innerHTML = `;
            <img src="${imgURL}" alt="${textAlt2}">
        `;
    });
    
    // Injection de la quantité choisie
    cons.inputElt.addEventListener("input", (e) => {
        cons.inputElt.setAttribute("value", e.target.value);
    });
};


/**
 * Création d'un nouvel Objet contenant l'Id et le nom de l'article
 * @param {object} art récupéré de l'api
 * @returns {object} objet contenant name et id de l'article
 */
const funCartObj = (art) => {

    let cartObj = new Object;
    cartObj.name = art.name;
    cartObj.id = art._id;
    return cartObj;

}


/**
 * Envoie l'Objet cart dans le localStorage après lui avoir rajouter la couleur et la quantité
 * @param {HTMLSelectElement} select 
 * @param {HTMLInputElement} input 
 * @param {object} cart === funCartObj(article), Objet contenant :
 * @property {String} name : nom de l'article
 * @property {String} id : id de l'article
  */
function sendArticleToCart(select, input, cart) {
    if (select.value != "" && input.value != 0) {
        cart.color = select.value;
        cart.quantity = input.value;
        console.log(cart);
        addCart(cart);
    };
};

// =======================================
export { recupEltDom, funCartObj, sendArticleToCart };