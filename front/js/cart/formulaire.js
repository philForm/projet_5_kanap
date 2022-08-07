import { recupIdLocalStorage } from "./funct.js";

import { recupLocalStorage, formInputTab, promiseOrder, totalQuantityElt,totalPriceElt, form } from "./const.js";

import { validityOfFormOnSubmit, validFormBool, objectSend, sendOrderConfirm } from "./formulaire_funct.js";

import { getCart } from "../utils/funct_localstor.js";

console.log(getCart('cart'));
const productsId = recupIdLocalStorage(recupLocalStorage);
console.log(productsId);

const formSubmit = () => {

    let tests = validityOfFormOnSubmit(formInputTab, form)
    console.log(formInputTab)

    console.log(tests);
    if (tests.length === 0) {

        const validForm = validFormBool(formInputTab)

        console.log("validForm" + validForm);
        console.log(formInputTab);

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
                console.log(res);
                if (res.ok) {
                    return res.json();
                };

            }).then((value) => {
                console.log(value);
                let orderId = value.orderId;
                const url = new URL(window.location.href);
                console.log(url.origin);
                let route = '/front/html/confirmation.html';
                let confirm = (`${url.origin}${route}?orderid=${orderId}`);
                window.location.href = confirm ;
                console.log(confirm);
                
            }).catch((err)=>{
                console.error(err);
                alert("Le serveur est dans l'incapacité d'afficher ces informations !")
            });

        }

    }
}

export { formSubmit };