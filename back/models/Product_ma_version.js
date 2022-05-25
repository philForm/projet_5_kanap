const products = [
  {
    "colors": ["Blue", "White", "Black"],
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": ["kanap01.jpg", "kanap01_white.jpg", "kanap01_black.jpg"],
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": ["Photo d'un canapé bleu, deux places", "Photo d'un canapé blanc, deux places", "Photo d'un canapé noir, deux places"]
  },
  {
    "colors": ["Black/Yellow", "Black/Red"],
    "_id": "415b7cacb65d43b2b5c1ff70f3393ad1",
    "name": "Kanap Cyllène",
    "price": 4499,
    "imageUrl": ["kanap02.jpg", "kanap02_red.jpg"],
    "description": "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
    "altTxt": ["Photo d'un canapé jaune et noir, quatre places", "Photo d'un canapé rouge et noir, quatre places"]
  },
  {
    "colors": ["Green", "Red", "Orange"],
    "_id": "055743915a544fde83cfdfc904935ee7",
    "name": "Kanap Calycé",
    "price": 3199,
    "imageUrl": ["kanap03.jpg", "kanap03_red.jpg", "kanap03_orange.jpg"],
    "description": "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    "altTxt": ["Photo d'un canapé d'angle, vert, trois places", "Photo d'un canapé d'angle, rouge, trois places", "Photo d'un canapé d'angle, orange, trois places"]
  },
  {
    "colors": ["Pink", "White"],
    "_id": "a557292fe5814ea2b15c6ef4bd73ed83",
    "name": "Kanap Autonoé",
    "price": 1499,
    "imageUrl": ["kanap04.jpg", "kanap04_white.jpg"],
    "description": "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    "altTxt": ["Photo d'un canapé rose, une à deux place", "Photo d'un canapé blanc, une à deux place"]
  },
  {
    "colors": ["Grey", "Purple", "Blue"],
    "_id": "8906dfda133f4c20a9d0e34f18adcf06",
    "name": "Kanap Eurydomé",
    "price": 2249,
    "imageUrl": ["kanap05.jpg", "kanap05_purple.jpg", "kanap05_blue.jpg"],
    "description": "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
    "altTxt": ["Photo d'un canapé gris, trois places", "Photo d'un canapé violet, trois places", "Photo d'un canapé bleu, trois places"]
  },
  {
    "colors": ["Grey", "Navy"],
    "_id": "77711f0e466b4ddf953f677d30b0efc9",
    "name": "Kanap Hélicé",
    "price": 999,
    "imageUrl": ["kanap06.jpg", "kanap06_navy.jpg"],
    "description": "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
    "altTxt": ["Photo d'un canapé gris, deux places", "Photo d'un canapé bleu marine, deux places"]
  },
  {
    "colors": ["Red", "Silver"],
    "_id": "034707184e8e4eefb46400b5a3774b5f",
    "name": "Kanap Thyoné",
    "price": 1999,
    "imageUrl": ["kanap07.jpg", "kanap07_silver.jpg"],
    "description": "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
    "altTxt": ["Photo d'un canapé rouge, deux places", "Photo d'un canapé argent, deux places"]
  },
  {
    "colors": ["Pink", "Brown", "Yellow", "White"],
    "_id": "a6ec5b49bd164d7fbe10f37b6363f9fb",
    "name": "Kanap orthosie",
    "price": 3999,
    "imageUrl": ["kanap08.jpg", "kanap08_marron.jpg", "kanap08_yellow.jpg", "kanap08_white.jpg"],
    "description": "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
    "altTxt": ["Photo d'un canapé rose, trois places", "Photo d'un canapé marron, trois places", "Photo d'un canapé jaune, trois places", "Photo d'un canapé blanc, trois places"]
  }
];

exports.find = () => {
  return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(products))));
}

exports.findById = (id) => {
  return new Promise((resolve, reject) =>
    resolve(JSON.parse(JSON.stringify(products)).find(product =>
      product._id == id)
    )
  );
}




