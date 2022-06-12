
// Validation des noms du formulaire
const nameValid = (regex, name, error) => {
    if (regex.test(name)) {
        console.log("nom valide !")
        error.innerText = "valide !"
        error.style.color = "#81ff81"
        return true
    } else {
        console.log("nom invalide !")
        error.innerText = "pas valide !"
        error.style.color = "red"
        return false
    }
}

export { nameValid }
