import * as cons from "./const.js";
import { colorsKanap, regexColors } from "../utils/array_colors.js";
import { engNameColor, splitUrl, urlImagRestitute, replaceColor, valueReplace } from "../utils/funct_globale.js";
import { addCart } from "../utils/funct_localstor.js";


/**
 * Injection des éléments de l'article récupéré de l'api dans le DOM
 * @param {object} article 
 */
const retrieveEltDom = (article) => {

    cons.titleHead.innerHTML = article.name;
    
    // création de dadaset
    cons.divImgElt.setAttribute("data-exist", "");
    
    cons.divImgElt.innerHTML = `
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            `;
    cons.titleElt.innerText = article.name;
    cons.priceElt.innerText = article.price;
    cons.descriptElt.innerText = article.description;

    let colorHtml = "";

    const colFrag = new DocumentFragment();

    // Boucle pour injecter les couleurs dans les éléments <options> de <select>
    for (let col of article.colors) {

        let colorTab = col.split("/");

        // réinitialisation de colorHtml
        colorHtml = '';

        for (let color of colorTab) {

            // cherche la traduction en français de color dans le tableau colorsKanap
            let colorFr = (colorsKanap.find((col => col[0] == color.toLowerCase())))[1];


            // Les couleurs en anglais sont remplacées par leurs noms en français.
            // Si l'index de color dans colorTab est différent de la longueur du tableau colorTab - 1
            if (colorTab.length > 1 && colorTab.indexOf(color) != colorTab.length - 1)
                colorHtml += `${colorFr} et`;
            else if (colorTab.length > 1 && colorTab.indexOf(color) == colorTab.length - 1)
                colorHtml += ` ${colorFr}`;
            else
                colorHtml = `${colorFr}`;
        }

        // création de l'élément HTML <option>
        let option = document.createElement("option");
        // ajout à <option> de l'attribut "value"
        option.setAttribute("value", colorHtml);
        option.innerText = colorHtml;

        colFrag.appendChild(option);
    };
    cons.selectElt.appendChild(colFrag);


    // injection de la couleur choisie dans <select>
    cons.selectElt.addEventListener("input", (e) => {
        cons.selectElt.setAttribute("value", e.target.value);
        // récuperation dans value de la valeur de l'élément <select>
        let value = (cons.selectElt.value).trim();
        // on coupe le string et on obtient un array.
        let valueTab = value.split(' ');

        // Récupère la valeur de la couleur en anglais.
        let colorEng = engNameColor(valueTab[valueTab.length - 1]);

        // coupe l'url de l'image pour supprimer l'extension de l'image.
        let urlSplit = splitUrl(article);

        // on reconstitue l'url de l'image.
        let imgURL = urlImagRestitute(urlSplit, colorEng);
        
        // vérification de l'existence de l'image pointée par imgURL
        fetch(imgURL)
            .then(data => {
                // let color = valueReplace(valueTab, value);
                let color = valueReplace(valueTab, value);

                // texte alternatif de l'image.
                let textAlt2 = replaceColor(article.altTxt, color, regexColors);
                
                if (data.status >= 200 && data.status < 300) {
                    cons.divImgElt.dataset.exist = 1;
                    imgURL = urlImagRestitute(urlSplit, colorEng);
                    if (cons.selectElt.value == "") {
                        textAlt2 = article.altTxt;
                    }
                }
                else {
                    cons.divImgElt.dataset.exist = 0;
                    imgURL = article.imageUrl;
                    textAlt2 = article.altTxt;

                }

                cons.divImgElt.innerHTML = `
                            <img src="${imgURL}" alt="${textAlt2}">
                        `;
            }).catch(err => console.error(err));

    });

    // Injection de la quantité choisie.
    cons.inputElt.addEventListener("input", (e) => {
        if (e.target.value > 0 && e.target.value <= 100)
            cons.inputElt.setAttribute("value", e.target.value);
        else {
            alert("La quantité doit être comprise entre 1 et 100 !");
            cons.inputElt.setAttribute("value", 0);
            e.target.value = 0;
        };
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
 * Envoie l'Objet cart dans le localStorage après lui avoir ajouté la couleur et la quantité
 * @param {HTMLSelectElement} select 
 * @param {HTMLInputElement} input 
 * @param {object} obj === funCartObj(article), Objet contenant :
 * @property {String} name : nom de l'article
 * @property {String} id : id de l'article
  */
function sendArticleToCart(select, img, input, obj) {
    if (select.value != "" && input.value != 0) {
        obj.color = select.value;
        obj.quantity = input.value;
        obj.exist = img.dataset.exist;
        addCart(obj);
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
    // dataConfirm est incrémenté de 1 à chaque nouvelle commande avec la même quantité et la même couleur.
    // dataConfirm est réinitialisée à 0 à chaque commande avec une quantité ou une couleur différente.
    let dataConfirm = parseInt(cons.buttonCartElt.dataset.confirm);
    let dataColor = cons.buttonCartElt.dataset.color;
    let dataQuantity = cons.buttonCartElt.dataset.quantity;
    // dataBool est à false si la commande passée une nouvelle fois concerne la même couleur et la même quantité d'articles.
    // dataBool est à true si la commande passée une nouvelle fois concerne une autre couleur ou une quantité différente.
    let dataBool = cons.buttonCartElt.dataset.bool;
    let pluralArt = "";
    let pluralCanap = "";

    // Si les valeurs de dataset et les valeurs entrées sont différentes, on réinitialise dataConfirm
    if (dataColor != (cons.selectElt.value).trim() ||
        dataQuantity != (cons.inputElt.value).trim()) {
        if (dataConfirm != 0) {
            // dataBool est initialisé à true
            cons.buttonCartElt.dataset.bool = "true";
            dataBool = cons.buttonCartElt.dataset.bool;
            // data-confirm = 0
            cons.buttonCartElt.dataset.confirm = 0;
        }
        dataConfirm = 0;
    };

    // Si dataConfirm = 0, la couleur et la quantité choisies sont enregistrées dans les dataset
    if (dataConfirm == 0) {
        cons.buttonCartElt.dataset.color = (cons.selectElt.value).trim();
        cons.buttonCartElt.dataset.quantity = (cons.inputElt.value).trim();
        dataConfirm = 1;
    };

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
        };
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
        sendArticleToCart(cons.selectElt, cons.divImgElt, cons.inputElt, cartObj);
    }
}

// =======================================
export {
    retrieveEltDom, funCartObj, sendArticleToCart, orderedVerifications
};