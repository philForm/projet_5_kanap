import { recupIdLocalStorage } from "./funct.js";

import { formInputTab, promiseOrder, totalQuantityElt,totalPriceElt, form } from "./const.js";

import { validityOfFormOnSubmit, validFormBool, objectSend, sendOrderConfirm } from "./formulaire_funct.js";

const productsId = recupIdLocalStorage();

/**
 * Envoie la commande au backend après validation du formulaire et du message de confirmation
 */
const formSubmit = () => {

    let tests = validityOfFormOnSubmit(formInputTab, form)

    if (tests.length === 0) {

        const validForm = validFormBool(formInputTab)

        const objValue = objectSend(validForm, formInputTab, productsId, form)
        
        let confirmation = sendOrderConfirm(objValue, totalQuantityElt, totalPriceElt);

        if (confirmation) {

            fetch(promiseOrder, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objValue)

            }).then((res) => {
                if (res.ok) {
                    return res.json();
                };

            }).then((value) => {
                let orderId = value.orderId;
                const url = new URL(window.location.href);
                let route = '/front/html/confirmation.html';
                let confirm = (`${url.origin}${route}?orderid=${orderId}`);
                window.location.href = confirm ;
                
            }).catch((err)=>{
                console.error(err);
                alert(`Le serveur est dans l'incapacité d'afficher ces informations ! ${err}`)
            });

        }

    }
}

export { formSubmit };