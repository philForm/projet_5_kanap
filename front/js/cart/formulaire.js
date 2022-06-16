
// Validation des noms du formulaire
const nameValid = (regex, name, error) => {

    if (regex.test(name)) {
        console.log("nom valide !")
        error.innerText = "valide !"
        error.style.color = "#81ff81"
        regex.lastIndex = 0;
        return true
    } else if (name === "") {

        error.innerText = ""

    } else {
        console.log("nom invalide !")
        error.innerText = "pas valide !"
        error.style.color = "red"
        regex.lastIndex = 0;
        return false
    }
}

export { nameValid }
