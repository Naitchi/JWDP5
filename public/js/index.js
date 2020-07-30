const getTeddies = async () => {
  //FONCTION POUR RECUPERER LES API
  try {
    const response = await fetch("/api/teddies");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log("Retour du serveur : ", response.status);
    }
  } catch (error) {
    console.log(error);
  }
};

//faire une fontion 
const buildALi = (teddy) =>{
  document.createElement("li");
  //ajouter la classe en fonction de 
}

const buildATeddyDiv = (teddy, startingElement) => {
  //FONCTION QUI AJOUTE DU CODE HTML SELON UN RESULTAT
  console.log("teddy => " + teddy);
  startingElement.appendChild(document.createElement("li"));
  var selectedElement = startingElement.lastChild;
  selectedElement.appendChild(document.createElement("div"));
  const resultElement = selectedElement.lastChild;
  resultElement.classList.add("mainSide__searchResults__li__result");
  const imageElement = document.createElement("img");
  imageElement.src = teddy.imageUrl;
  resultElement.appendChild(imageElement);
  selectedElement = resultElement.lastChild;
  selectedElement.classList.add("mainSide__searchResults__li__result__photo");
  resultElement.appendChild(document.createElement("div"));
  const textElement = resultElement.lastChild;
  textElement.classList.add("mainSide__searchResults__li__result__text");
  textElement.appendChild(document.createElement("h2"));
  selectedElement = textElement.lastChild;
  selectedElement.classList.add("mainSide__searchResults__li__result__name");
  selectedElement.textContent = teddy.name;
  textElement.appendChild(document.createElement("p"));
  selectedElement = textElement.lastChild;
  selectedElement.classList.add("mainSide__searchResults__li__result__description");
  selectedElement.textContent = teddy.description;
  resultElement.appendChild(document.createElement("div"));
  const dandpElement = resultElement.lastChild;
  dandpElement.classList.add("mainSide__searchResults__li__result__D&P");
  dandpElement.appendChild(document.createElement("div"));
  const dispoElement = dandpElement.lastChild;
  dispoElement.classList.add("mainSide__searchResults__li__result__D&P__Dispo");
  dispoElement.appendChild(document.createElement("h3"));
  selectedElement = dispoElement.lastChild;
  selectedElement.classList.add(
    "mainSide__searchResults__li__result__D&P__Dispo__title"
  );
  selectedElement.textContent = "Dispo :";
  dispoElement.appendChild(document.createElement("i"));
  selectedElement = dispoElement.lastChild;
  selectedElement.classList.add("fas");
  selectedElement.classList.add("fa-check");
  dandpElement.appendChild(document.createElement("div"));
  const priceElement = dandpElement.lastChild;
  priceElement.classList.add("mainSide__searchResults__li__result__D&P__Price");
  priceElement.appendChild(document.createElement("h3"));
  selectedElement = priceElement.lastChild;
  selectedElement.classList.add(
    "mainSide__searchResults__li__result__D&P__Price__title"
  );
  selectedElement.textContent = "Prix :";
  priceElement.appendChild(document.createElement("p"));
  selectedElement = priceElement.lastChild;
  selectedElement.classList.add(
    "mainSide__searchResults__li__result__D&P__Price__value"
  );
  selectedElement.textContent = teddy.price + " €";
};
/*
    <li class='mainSide__searchResults__li'> (done)
        <div class="mainSide__searchResults__li__result"> (done)                        !!!RESULTELEMENT!!!
            <img class="mainSide__searchResults__li__result__photo"/> (done)
            <div class="mainSide__searchResults__li__result__text">(done)
                <h2 class="mainSide__searchResults__li__result__text__name">Lorem ipsum dolor sit</h2>(done)
                <p class="mainSide__searchResults__li__result__text_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae   velit sed nisi commodo pulvinar vitae vel nulla. Morbi ac suscipit diam.</p>
            </div>(done)
            <div class="mainSide__searchResults__li__result__D&P">(done)
                <div class="mainSide__searchResults__li__result__D&P__Dispo">(done)
                    <h3 class="mainSide__searchResults__li__result__D&P__Dispo__title">Dispo: </h3>(done)
                    <img class="mainSide__searchResults__li__result__D&P__Dispo__status"/>(done)
                </div>
                <div class="mainSide__searchResults__li__result__D&P__Price">(done)
                    <h4 class="mainSide__searchResults__li__result__D&P__Price__title ">Prix: </h4>(done)
                    <p class="mainSide__searchResults__li__result__D&P__Price__value">30€</p>(done)
                </div>
            </div>
        </div>
    </li>
*/
const insertAllTeddies = (elementSearchResult, teddies) => {
  //FONCTION INSERTION DE TOUT LES RESULTAT GRACE A LA FONCTION BUILDATEDDY
  console.log(elementSearchResult);
  teddies.map((teddy) => buildATeddyDiv(teddy, elementSearchResult));
};

getTeddies().then((teddies) => {
  //Mise en place de toutes les fonctions
  const searchResultsElement = document.getElementById("searchResults");
  insertAllTeddies(searchResultsElement, teddies);
});