/**
 * Tableaux de tableaux contenant chaqu'un deux éléments : 
 * @property la couleur en anglais
 * @property la couleur en français
 * @type {object[]} Array of string
 */
const colorsKanap = [
    [
        "blue", "bleu"
    ],
    [
        "white", "blanc"
    ],
    [
        "black", "noir"
    ],
    [
        "yellow", "jaune"
    ],
    [
        "red", "rouge"
    ],
    [
        "green", "vert"
    ],
    [
        "orange", "orange"
    ],
    [
        "pink", "rose"
    ],
    [
        "grey", "gris"
    ],
    [
        "purple", "violet"
    ],
    [
        "navy", "bleu marine"
    ],
    [
        "navy", "marine"
    ],
    [
        "silver", "argent"
    ],
    [
        "brown", "marron"
    ]
]



// const regexColors = /(?i)(\W|^)(bleu|jaune|vert|rose|gris|rouge)(\W|$)/

/**
 * Teste la présence de différents noms de couleur dans un string
 * @type {RegExp}
 */
const regexColors = /(bleu|jaune|vert|rose|gris|rouge)/ig

export { colorsKanap, regexColors }