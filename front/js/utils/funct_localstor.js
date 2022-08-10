import * as cons from "../products/const.js";

// =======================================
// LOCALSTORAGE
// =======================================

/**
 * Enregistrement dans le panier (localstorage)
 * @param {object[]} cart 
 */
const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Récupération du panier (localstorage)
 * @param {String} loc : clé de l'Objet enregistré dans le localstorage
 * @returns {object[]}
 */
const getCart = (loc) => {
    let cart = localStorage.getItem(loc);
    if (cart == null)
        return [];
    else
        return JSON.parse(cart);
}

/**
 * Ajouter les produit dans le panier (localstorage)
 * @param {object} product 
 */
const addCart = (product) => {
    let cart = getCart("cart");
    console.log(product);
    console.log(product.id);
    // recherche d'un produit par son id
    let foundProduct = cart.find((p => p.id == product.id) && (col => col.color == product.color));
    console.log(foundProduct);
    if (foundProduct != undefined) {
        let quantity = parseInt(foundProduct.quantity);
        foundProduct.quantity = quantity + parseInt(cons.inputElt.value);
    }
    else {
        cart.push(product);
    }
    saveCart(cart);
}

/**
 * Supprimer un produit du panier (localstorage)
 * @param {object} product 
 */
const removeProduct = (product) => {
    let cart = getCart("cart");
    cart = cart.filter((prod => prod.id != product[0]) && (prod => prod.color != product[1]));
    saveCart(cart);
}

/**
 * Change la quantité du produit dans le localstorage.
 * @param {object} product 
 * @param {String} quant : valeur de l'input de l'article
 */
const changeQuantity = (product, quant) => {
    // récupère le localstorage
    let cart = getCart("cart");
    // récupération du produit ciblé dans le localstorage
    let foundProduct = cart.find((p => p.id == product[0]) && (col => col.color == product[1]));
    console.log(product);
    console.log(foundProduct);
    console.log(quant);
    if (foundProduct != undefined && quant <= 100) {
        foundProduct.quantity = parseInt(quant);
        console.log(typeof foundProduct.quantity);
        saveCart(cart);
        // if (foundProduct.quantity <= 0) {
            // removeProduct(product);

        // }

    }
    if (quant > 100){
        alert("La quantité de cet article ne peut excéder 100 !");
    }
}

//
/**
 * Calcule la quantité totale d'articles contenus dans le localstorage
 * @returns {Number}
 */
const changeQuantityTotal = () => {
    let cart = getCart("cart");
    let total = 0;
    for (let item of cart)
        total += Number(item.quantity);

    return total;
}

/**
 * Calcule le prix total
 * @param {object[]} tab 
 * @returns {Number}
 */
const changeTotalPrice = (tab) => {
    let cart = getCart("cart");
    let total = 0;
    for (let item of tab) {
        let foundProduct = cart.find((i => i.id == item[0]) && (col => col.color == item[1]));
        if (foundProduct != undefined)
            total += foundProduct.quantity * item[3].price;
    }
    return total;
}

export { saveCart, getCart, addCart, removeProduct, changeQuantity, changeQuantityTotal, changeTotalPrice };