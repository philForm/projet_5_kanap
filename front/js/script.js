// Selection éléments
let sectionElt = document.getElementById("items");

(async function main() {

    const promise = "http://localhost:3000/api/products";

    let reponse = await fetch(promise)
        .then(reponse => reponse.json());
    console.log(reponse);

    for (let i in reponse) {
        // Création éléments HTML
        let aElt = document.createElement("a");
        let articleElt = document.createElement("article");
        let imgElt = document.createElement("img");
        let h3Elt = document.createElement("h3");
        let pElt = document.createElement("p");
        // Injections éléments dans le DOM
        sectionElt.appendChild(aElt);
        aElt.appendChild(articleElt);
        articleElt.appendChild(imgElt);
        articleElt.appendChild(h3Elt);
        articleElt.appendChild(pElt);
        // Création d'attributs
        aElt.setAttribute("href", `product.html?id=${reponse[i]._id}`);
        imgElt.setAttribute("src", reponse[i].imageUrl);
        imgElt.setAttribute("alt", reponse[i].altTxt);
        // Création de contenu
        h3Elt.innerText = reponse[i].name;
        pElt.innerText = reponse[i].description;
        // Ajout de classes
        h3Elt.classList.add("productName");
        pElt.classList.add("productDescription");
    }

})();
