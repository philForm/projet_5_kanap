/**
 * URL des produits de l'api
 * @type {(URL|String)}
 */
const promise = `http://localhost:3000/api/products`

/**
 * @type {HTMLElement} \<section class="items" id="items"\>
 */
const sectionElt = document.getElementById("items")

window.onload = () => {

    fetch(promise)
        .then(data => data.json())
        .then(jsonArticle => {
            console.log(jsonArticle)
            
            for (let article of jsonArticle) {
                console.log(article.name)
                sectionElt.innerHTML += `
                    <a class="lien" href="./product.html?id=${article._id}">
                        <article>
                            <img src="${article.imageUrl}" alt="${article.altTxt}">
                            <h3 class="productName">${article.name}</h3>
                            <p class="productDescription">${article.description}</p>
                        </article>
                    </a>    `
            }
            // for (let i = 0; i < jsonArticle.length; i++) {
            //     document.querySelector(`#items > a:nth-child(${i + 1})`).addEventListener("click", (e) => {
            //         // e.stopPropagation()
            //         // e.preventDefault()
            //         // console.log(jsonArticle[i]._id)
            //         // console.log(jsonArticle[i].name)
            //     })
            // }


        })

}

