import { recupId } from "./utils/funct_globale.js";


/**
 * Charge l'url récupéré de l'url dans le DOM.

 * Efface le localStorage
 * @param {HTMLElement} elt 
 * @param {String} url 
 * @param {object} urlConfirm
 */
const confirmClearLocalStorage = (elt, url, urlConfirm) => {
    elt.innerText = url;
    localStorage.clear();
    urlConfirm.search = ""
}


window.onload = () => {
    
    const orderIdElt = document.getElementById("orderId");
    
    const urlConfirm = new URL(window.location.href);

    const urlId = recupId('orderid', urlConfirm)

    confirmClearLocalStorage(orderIdElt, urlId, urlConfirm)

}






