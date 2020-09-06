const getTeddies = async () => {
  //FONCTION POUR RECUPERER LES API
  try {
    const response = await fetch("/api/teddies");
    if (response.ok) {
      const data = response.json();
      console.log(data);
      return data;
    } else {
      console.log("Retour du serveur : ", response.status);
    }
  } catch (error) {
    console.log(error);
  }
};

//fonction pour les div parents

const buildAResultDiv = (index, teddy) => {
  const actualElement = buildALi(index, "mainSide__searchResults__result");
  actualElement.appendChild(
    buildAImg(
      "mainSide__searchResults__result__photo",
      teddy.imageUrl,
      "Photo de l'ourson"
    )
  );
  actualElement.appendChild(buildATextDiv(teddy));
  actualElement.appendChild(buildAPAndDDiv(teddy));
  return actualElement;
};

const buildATextDiv = (teddy) => {
  const actualElement = buildADiv("mainSide__searchResults__result__text");
  actualElement.appendChild(
    buildATextContent(
      "h2",
      "mainSide__searchResults__result__text__name",
      teddy.name
    )
  );
  actualElement.appendChild(
    buildATextContent(
      "p",
      "mainSide__searchResults__result__text__description",
      teddy.description
    )
  );
  return actualElement;
};

const buildAPAndDDiv = (teddy) => {
  const actualElement = buildADiv("mainSide__searchResults__result__DandP");
  actualElement.appendChild(buildADispoDiv());
  actualElement.appendChild(buildAPriceDiv(teddy));
  return actualElement;
};

const buildADispoDiv = () => {
  const actualElement = buildADiv(
    "mainSide__searchResults__result__DandP__dispo"
  );
  actualElement.appendChild(
    buildATextContent(
      "h3",
      "mainSide__searchResults__result__DandP__dispo__title",
      "Dispo :"
    )
  );
  actualElement.appendChild(
    buildAFontAwesomeI(["fas", "fa-check", "fa-2x"], "#008000")
  );
  return actualElement;
};

const buildAPriceDiv = (teddy) => {
  const actualElement = buildADiv(
    "mainSide__searchResults__result__DandP__price"
  );
  actualElement.appendChild(buildATeddyPrice(teddy));
  actualElement.appendChild(
    buildAA(
      "mainSide__searchResults__result__DandP__price__moreDetails",
      "Plus de détails →",
      "html/details.html?_id=" + teddy._id
    )
  );
  return actualElement;
};

const buildATeddyPrice = (teddy) => {
  const actualElement = buildADiv(
    "mainSide__searchResults__result__DandP__price__teddyPrice"
  );
  actualElement.appendChild(
    buildATextContent(
      "h3",
      "mainSide__searchResults__result__DandP__price__teddyPrice__title",
      "Prix :"
    )
  );
  actualElement.appendChild(
    buildATextContent(
      "p",
      "mainSide__searchResults__result__DandP__price__teddyPrice__value",
      teddy.price + " €"
    )
  );
  return actualElement;
};

//FONCTION QUI AJOUTE DU CODE HTML SELON UN RESULTAT
const buildATeddyDiv = (teddy, startingElement, index) => {
  startingElement.appendChild(buildAResultDiv(index, teddy));
};

//FONCTION INSERTION DE TOUT LES RESULTAT GRACE A LA FONCTION BUILDATEDDY
const insertAllTeddies = (elementSearchResult, teddies) => {
  console.log(elementSearchResult);
  teddies.map((teddy, index) =>
    buildATeddyDiv(teddy, elementSearchResult, index)
  );
};

//Mise en place de toutes les fonctions
getTeddies().then((teddies) => {
  const searchResultsElement = document.getElementById("searchResults");
  insertAllTeddies(searchResultsElement, teddies);
});
