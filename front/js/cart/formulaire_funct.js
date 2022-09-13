import { getCart } from "../utils/funct_localstor.js"

/**
 * Validation des champs du formulaire en direct
 * @param { RegExp } regex 
 * @param {String} name 
 * @param {HTMLParagraphElement} error 
 * @param {object[]} msg 
 * @returns {boolean}
 */
const nameValid = (regex, name, error, msg) => {

    if (regex.test(name)) {
        if (msg)
            error.innerText = msg[1]
        error.style.color = "#81ff81"
        regex.lastIndex = 0;
        return true
    } else if (name === "") {

        error.innerText = ""

    } else {
        if (msg)
            error.innerText = msg[0]
        error.style.color = "red"
        regex.lastIndex = 0;
        return false
    }
}

/**
 * Seconde validation des champs du formulaire lors de la tentative d'envoi !
 * @param {HTMLParagraphElement} errorElt 
 * @param {String} objKey 
 * @param {String} formValue 
 */
const nameValid2 = (errorElt, objKey, formValue) => {
    let regex = [
        [
            /[0-9]/, [
                "Tu as des chiffres dans ton prénom toi !",
                "Tu as des chiffres dans ton nom toi !"
            ]
        ],
        [
            /[?]/, [
                "Prénom ? Réponse ?!?!?! !",
                "Tu te poses une question ?",
                "Je ne peux pas répondre, je ne sais pas comment tu t'appelles !"
            ]
        ],
        [
            "C'est une ville qui a été construite hier ?",
            "On ne livre pas au delà des frontières de la galaxie !",
            "Le livreur ne trouvera jamais !"
        ],
        [
            "Il semblerait que cet email soit des plus fantaisiste !",
            "On demande un email, pas les numéros du loto !",
            "Ceci est un email de dernière génération !!!"
        ]

    ];


    // errorElt.style.color = "#ffed4d";
    errorElt.style.color = "orange";

    if (objKey == "firstName") {
        if (regex[0][0].test(formValue))
            errorElt.innerText = regex[0][1][0]
        else if (regex[1][0].test(formValue))
            errorElt.innerText = regex[1][1][Math.floor(Math.random() * regex[1][1].length)]
        else
            errorElt.innerText = "Tu crois que c'est un prénom ça !"
    }
    if (objKey == "lastName") {
        if (regex[0][0].test(formValue))
            errorElt.innerText = regex[0][1][1]
        else
            errorElt.innerText = "Tu crois que c'est un nom ça !"
    }
    if (objKey == "address") {
        errorElt.innerText = "Tu es sûr d'habiter là !"
    }
    if (objKey == "city") {
        errorElt.innerText = regex[2][Math.floor(Math.random() * regex[2].length)]

    }
    if (objKey == "email") {
        errorElt.innerText = regex[3][Math.floor(Math.random() * regex[3].length)]

    }

}

/**
 * Ecoute les changements en direct des champs du formulaire de validation de commande.
 * @param {object[]} tab tableau de tableaux contenant chacun :
 * @type {HTMLInputElement} exemple : \<input type="text" name="firstName" id="firstName" required=""\>
 * @type {RegExp}
 * @type {HTMLParagraphElement} exemple : \<p id="firstNameErrorMsg"\>
 * @type {object[]} contient deux strings : textes de validation
 * @type {String} correspond à la valeur de l'Id de l'\<input\>
 */
function listenValuesInputOfForm(tab) {
    for (let item of tab) {
        item[0].addEventListener("input", () => {
            nameValid(item[1], item[0].value, item[2], item[3]);
        });
    }
}

/**
 * Teste la validité des champs du formulaire de commande lors de la soumission, et charge un message de validation pour chaque champ.
 * @param {object[]} tab tableau de tableaux contenant chacun :
 * @type {HTMLInputElement} exemple : \<input type="text" name="firstName" id="firstName" required=""\>
 * @type {RegExp}
 * @type {HTMLParagraphElement} exemple : \<p id="firstNameErrorMsg"\>
 * @type {[String]} contient deux strings : textes de validation
 * @type {String} correspond à la valeur de l'Id de l'\<input\>
 * @param {HTMLFormElement} form tableau de tableaux contenant chacun :
 * @returns {object[]} Vide si le formulaire est valide
 */
function validityOfFormOnSubmit(tab, form) {

    let tests = [];
    for (let item of tab) {
        let boolValue = nameValid(item[1], item[0].value, item[2], item[3]);
        if (typeof item[item.length - 1] === 'boolean')
            item.pop();
        item.push(boolValue);
        if (!boolValue) {
            tests.push(false);
            nameValid2(item[2], item[4], form[item[4]].value);
        }
    }
    return tests;

}

/**
 * Création de l'Objet envoyé par la méthode POST au backend
 * @param {boolean}  validForm 
 * @param {object[]} tab 
 * @param {object[]} products : Tableau d'Ids des produits du localStorage
 * @returns {object} objValue : Contient les informations provenant du formulaire de validation, et les produits du localStorage 
 */
function objectSend(validForm, tab, products, form) {
    const objValue = {
        contact: {}
    };

    for (let item of tab) {

        validForm ? (
            objValue.contact[item[4]] = form[item[4]].value,
            form[item[4]].value = ""
        ) :
            objValue = "";
    };

    validForm ? objValue.products = products :
        objValue = "";

    return objValue;

}

/**
 * Renvoie un boolean, true si le formulaire est valide
 * @param {object} tab 
 * @returns {boolean} 
 */
function validFormBool(tab) {
    let validForm = true;
    for (let item of tab) {
        if (!item[item.length - 1]) {
            validForm = false;
        }
        while (typeof item[item.length - 1] === 'boolean')
            item.pop();
    }
    return validForm;
}

/**
 * Message d'alerte de confirmation de la commande !
 * @param {object} objValue : objet devant être envoyé au backend
 * @param {HTMLSpanElement} quantity 
 * @param {HTMLSpanElement} price 
 * @returns {String} alert ou message de confirmation de l'envoi.
 */
const sendOrderConfirm = (objValue, quantity, price) => {
    let cart = getCart("cart")
    if (cart.length == 0)
        return alert("Votre panier ne contient aucun article !")

    let confirmation = false;
    let article = "";
    quantity.innerText == 1 ? article = 'article' : article = 'articles';
    confirmation = confirm(
        `Vos informations : \n${objValue.contact.firstName} ${objValue.contact.lastName},\nvotre adresse : ${objValue.contact.address} ${objValue.contact.city},\nvotre email : ${objValue.contact.email}\n\nVotre commande est de ${quantity.innerText} ${article} pour un montant de ${price.innerText} €.`
    );
    return confirmation;

};


export {
    nameValid, nameValid2, listenValuesInputOfForm,
    validityOfFormOnSubmit, objectSend, validFormBool, sendOrderConfirm
}
