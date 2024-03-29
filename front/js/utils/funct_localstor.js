import * as cons from "../products/const.js";

// =======================================
// LOCALSTORAGE
// =======================================

/**
 * Enregistrement dans le panier (localStorage)
 * @param {object[]} cart 
 */
const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Récupération du panier (localStorage)
 * @param {String} loc : clé de l'Objet enregistré dans le localStorage
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
 * Ajouter les produits dans le panier (localStorage)
 * @param {object} product 
 */
const addCart = (product) => {
    let cart = getCart("cart");
    // recherche d'un produit par son id et sa couleur dans le localStorage
    let foundProduct = cart.find(p => (p.id == product.id) && (p.color == product.color));
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
 * Supprimer un produit du panier (localStorage)
 * @param {object} product 
 */
const removeProduct = (product) => {
    let cart = getCart("cart");

    cart = cart.filter(prod => (prod.id !== product[0]) || (prod.color.trim() !== product[1].trim()));
    saveCart(cart);
}

/**
 * Change la quantité du produit dans le localStorage.
 * @param {object} product 
 * @param {String} quant : valeur de l'input de l'article
 */
const changeQuantity = (product, quant) => {
    // récupère le localStorage
    let cart = getCart("cart");
    
    // récupération du produit ciblé dans le localStorage
    let foundProduct = cart.find(p => (p.id == product[0]) && (p.color == product[1]));
    
    if ((foundProduct != undefined) && (quant > 0 && quant <= 100)) {
        foundProduct.quantity = parseInt(quant);
        saveCart(cart);
        
        product[2] = quant;
        return product;

    }
    if (quant > 100) {
        alert("La quantité de cet article ne peut excéder 100 !");
        quant = 100;
        product[2] = quant;
        return product;
    }
}

/**
 * Calcule la quantité totale d'articles contenus dans le localStorage
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
        let foundProduct = cart.find(p => (p.id == item[0]) && (p.color == item[1]));
        if (foundProduct != undefined)
            total += foundProduct.quantity * item[3].price;
    }
    return total;
}

export { saveCart, getCart, addCart, removeProduct, changeQuantity, changeQuantityTotal, changeTotalPrice };