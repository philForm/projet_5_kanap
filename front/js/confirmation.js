import { recupId } from "./utils/funct_globale.js";


/**
 * Charge orderId récupéré de l'url dans le DOM.
 *
 * Efface le localStorage
 * @param {HTMLElement} elt 
 * @param {String} url 
 */
const confirmClearLocalStorage = (elt, url, urlConfirm) => {
    elt.innerText = url;
    localStorage.removeItem("cart");
    urlConfirm.search = ""
}

window.onload = () => {

    const orderIdElt = document.getElementById("orderId");
    const urlConfirm = new URL(window.location.href);
    const urlId = recupId('orderid', urlConfirm)

    confirmClearLocalStorage(orderIdElt, urlId, urlConfirm)

}






