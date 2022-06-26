
// Validation des noms du formulaire en direct
const nameValid = (regex, name, error, msg) => {

    if (regex.test(name)) {
        console.log("nom valide !")
        if (msg)
            error.innerText = msg[1]
        error.style.color = "#81ff81"
        regex.lastIndex = 0;
        return true
    } else if (name === "") {

        error.innerText = ""

    } else {
        console.log("nom invalide !")
        if (msg)
            error.innerText = msg[0]
        error.style.color = "red"
        regex.lastIndex = 0;
        return false
    }
}

// Active ou désactive le bouton de validation
const activeButton = (formInput, orderForm) => {
    !formInput ? (
        orderForm.disabled = true,
        orderForm.classList.add("disabled")
    ) : (
        orderForm.disabled = false,
        orderForm.classList.remove("disabled")
    )
}



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
            /[@]/, [
                "Un email sans arobase, c'est comme une choucroute sans saussice !!",
                "Et l'arobase, il vient l'arobase !",
                "Mon royaume pour un arobase !"
            ],
            [
                "Il semblerait que cet email soit des plus fantaisiste !",
                "On demande un email, pas les numéros du loto !",
                "Ceci est un email de dernière génération !!!"
            ]
        ]
    ];

    console.log(regex)

    // errorElt.style.color = "#ffed4d";
    errorElt.style.color = "orange";
    console.log(`objKey == "firstName" : ${objKey == "firstName"}`)

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
        if ((!regex[3][0].test(formValue)))
            errorElt.innerText = regex[3][1][Math.floor(Math.random() * regex[3][1].length)]
        else
            errorElt.innerText = regex[3][2][Math.floor(Math.random() * regex[3][2].length)]

    }

}


export { nameValid, nameValid2, activeButton }
