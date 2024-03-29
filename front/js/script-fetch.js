/**
 * URL des produits de l'API
 * @type {(URL|String)}
 */
const promise = `http://localhost:3000/api/products`;

/**
 * @type {HTMLElement} \<section class="items" id="items"\>
 */
const sectionElt = document.getElementById("items");

window.onload = () => {

    fetch(promise)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((err) => {
            console.error(err);
            alert(`La page des produits ne peut pas être affichée !", ${err}`);
        })
        .then(jsonArticle => {

            const fragment = new DocumentFragment();

            for (let article of jsonArticle) {

                let a = document.createElement("a");
                a.className = "lien";
                a.href = `./product.html?id=${article._id}`;
                a.innerHTML = `
                        <article>
                            <img src="${article.imageUrl}" alt="${article.altTxt}">
                            <h3 class="productName">${article.name}</h3>
                            <p class="productDescription">${article.description}</p>
                        </article>
                `;
                fragment.appendChild(a);
            };
            sectionElt.appendChild(fragment);

        }).catch((err) => {
            console.error(err);
            alert(`Une erreur est survenue !, ${err}`)
        });

};

