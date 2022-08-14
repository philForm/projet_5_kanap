import * as cons from "./const.js";
import { colorsKanap, regexColors } from "../utils/array_colors.js";
import { displayImgIndex, engNameColor, splitUrl, urlImagRestitute, replaceColor, valueReplace } from "../utils/funct_globale.js";
import { addCart, getCart } from "../utils/funct_localstor.js";


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

        cons.divImgElt.innerHTML = `
            <img src="${imgURL}" alt="${textAlt2}">
        `;
    });
    
    // // Injection de la quantité choisie
    // cons.inputElt.addEventListener("input", (e) => {
    //     if (e.target.value > 0 && e.target.value <= 100)
    //         cons.inputElt.setAttribute("value", e.target.value);
    //     else 
    //         alert("La quantité doit être comprise entre 1 et 100 !")
    // });
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


/**
 * Empêche grâce à des messages d'alerte et de confirmation l'envoi par inadvertance de commandes multiples !
 * @param {object} cartObj contient le nom et l'Id de l'article
 * @param {object} article article récupéré de l'API
 */
const orderedVerifications = (cartObj, article) => {

    let confirmation = false;
    // récupère la valeur de data-confirm
    let dataConfirm = parseInt(cons.buttonCartElt.dataset.confirm);
    let dataColor = cons.buttonCartElt.dataset.color;
    let dataQuantity = cons.buttonCartElt.dataset.quantity;
    let dataBool = cons.buttonCartElt.dataset.bool;
    console.log(dataBool);
    let pluralArt = "";
    let pluralCanap = "";


    // Si les valeurs de dataset et les valeurs entrées sont differentes, on réinitialise dataConfirm
    // if (dataColor != (cons.selectElt.value).trim() ||
    if (dataColor != (cons.selectElt.value) ||
        dataQuantity != (cons.inputElt.value).trim()) {
        if (dataConfirm != 0) {
            cons.buttonCartElt.dataset.bool = "true";
            dataBool = cons.buttonCartElt.dataset.bool;
            cons.buttonCartElt.dataset.confirm = 0;
        }
        dataConfirm = 0;
        console.log(dataConfirm);
    }

    // Si dataconfirm = 0, la couleur et la quantité choisies sont enregistrées dans les dataset
    if (dataConfirm == 0) {
        cons.buttonCartElt.dataset.color = (cons.selectElt.value).trim();
        cons.buttonCartElt.dataset.quantity = (cons.inputElt.value).trim();
        dataConfirm = 1;
    }

    // Singulier ou pluriel
    cons.inputElt.value == 1 ? (
        pluralArt = "cet article",
        pluralCanap = "canapé"
    ) : (
        pluralArt = "ces articles",
        pluralCanap = "canapés"
    );

    if (cons.selectElt.value == "" && cons.inputElt.value == 0)
        alert(
            `Veuillez choisir la couleur du canapé ${article.name} et la quantité désirée !`
        );
    else if (cons.selectElt.value == "")
        alert(
            `Veuillez choisir la couleur du canapé ${article.name} !`
        );
    else if (cons.inputElt.value == 0)
        alert(
            `Veuillez choisir le nombre de canapé(s) ${article.name} que vous souhaitez !`
        );
    else if (dataBool == "false") {
        if (dataConfirm <= 1) {
            confirmation = confirm(
                `${cons.inputElt.value} ${pluralCanap} ${article.name} en ${cons.selectElt.value}.\n Confirmez-vous l'ajout de ${pluralArt} à votre panier !`
            );
        } else {
            confirmation = confirm(
                `${cons.inputElt.value} ${pluralCanap} ${article.name} en ${cons.selectElt.value}.\n Voulez vous réellement ajouter ${pluralArt} à votre panier une ${dataConfirm}ème fois !!`
            );
        }
    }
    else if (dataBool == "true") {

        if (dataConfirm <= 1) {
            confirmation = confirm(
                `${cons.inputElt.value} ${pluralCanap} ${article.name} en ${cons.selectElt.value}.\n Souhaitez-vous vraiment ajouter cette nouvelle commande à votre panier !`
            );
        } else {
            confirmation = confirm(
                `${cons.inputElt.value} ${pluralCanap} ${article.name} en ${cons.selectElt.value}.\n Souhaitez-vous vraiment ajouter cette nouvelle commande à votre panier une ${dataConfirm}ème fois !!`
            );
        }
    }

    // Si le message de confirmation est validé, la commande est envoyée au panier.
    if (confirmation) {
        dataConfirm += 1;
        cons.buttonCartElt.dataset.confirm = dataConfirm;
        sendArticleToCart(cons.selectElt, cons.inputElt, cartObj);
    }
}

// =======================================
export {
    recupEltDom, funCartObj, sendArticleToCart, orderedVerifications
};