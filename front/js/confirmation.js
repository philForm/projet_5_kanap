/**
 * Récupère l'identifiant (id) dans l'url
 * @param {String} id key of identifier
 * @param {object} url 
 * @returns {String} identifiant de commande
 */
const recupId = (id, url) => {
    // let url = new URL(window.location.href);
    console.log(url);
    let searchParams = new URLSearchParams(url.search);
    console.log(searchParams);
    if (searchParams.has(id))
        return url.searchParams.get(id);
}

/**
 * Charge l'url récupéré de l'url dans le DOM.

 * Efface le localStorage
 * @param {HTMLElement} elt 
 * @param {String} url 
 */
const confirmClearLocalStorage = (elt, url) => {
    elt.innerText = url;
    // localStorage.clear();
    // urlConfirm.search = ""
}

window.onload = () => {

    const orderIdElt = document.getElementById("orderId");

    const urlConfirm = new URL(window.location.href);

    const urlId = recupId('orderid', urlConfirm)

    confirmClearLocalStorage(orderIdElt, urlId)

}






