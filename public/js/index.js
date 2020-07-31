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
const buildALi = (index) =>{
  const newElement = document.createElement("li");
  newElement.classList.add("mainSide__searchResults__li");
  if(index%2 == 0){
        newElement.classList.add("--colorBg");
  }
  else{
        newElement.classList.add("--darkerColorBg");
  }
  return newElement;
}

const buildADiv = (classe) =>{
  const newElement = document.createElement("div");
  newElement.classList.add(classe);    
  return newElement;         
}

const buildAImg = (classe, source) =>{
  const newElement = document.createElement("img");
  newElement.classList.add(classe);
  newElement.src = source;
  return newElement;        
}

const buildAH2 = (classe, content) =>{
  const newElement = document.createElement("h2");
  newElement.classList.add(classe);
  newElement.textContent = content;    
  return newElement;         
}

const buildAH3 = (classe, content) =>{
  const newElement = document.createElement("h3");
  newElement.classList.add(classe);
  newElement.textContent = content;    
  return newElement;         
}

const buildAFontAwesomeI = (classe1, classe2) =>{
  const newElement = document.createElement("i");
  newElement.classList.add(classe1);
  newElement.classList.add(classe2);
  return newElement;         
}

const buildAP = (classe, content) =>{
  const newElement = document.createElement("p");
  newElement.classList.add(classe);
  newElement.textContent = content;    
  return newElement;         
}

//FONCTION QUI AJOUTE DU CODE HTML SELON UN RESULTAT
const buildATeddyDiv = (teddy, startingElement, index) => {
  startingElement.appendChild(buildALi(index));
  var selectedElement = startingElement.lastChild;
  selectedElement.appendChild(buildADiv("mainSide__searchResults__li__result"));
  const resultElement = selectedElement.lastChild;
  resultElement.appendChild(buildAImg("mainSide__searchResults__li__result__photo",teddy.imageUrl));
  selectedElement = resultElement.lastChild;
  resultElement.appendChild(buildADiv("mainSide__searchResults__li__result__text"));
  const textElement = resultElement.lastChild;
  textElement.appendChild(buildAH2("mainSide__searchResults__li__result__name",teddy.name));
  selectedElement = textElement.lastChild;
  textElement.appendChild(buildAP("mainSide__searchResults__li__result__description",teddy.description));
  selectedElement = textElement.lastChild;
  resultElement.appendChild(buildADiv("mainSide__searchResults__li__result__D&P"));
  const dandpElement = resultElement.lastChild;
  dandpElement.appendChild(buildADiv("mainSide__searchResults__li__result__D&P__Dispo"));
  const dispoElement = dandpElement.lastChild;
  dispoElement.appendChild(buildAH3("mainSide__searchResults__li__result__D&P__Dispo__title","Dispo :"));
  selectedElement = dispoElement.lastChild;
  dispoElement.appendChild(buildAFontAwesomeI("fas", "fa-check"));
  selectedElement = dispoElement.lastChild;
  dandpElement.appendChild(buildADiv("mainSide__searchResults__li__result__D&P__Price"));
  const priceElement = dandpElement.lastChild;
  priceElement.appendChild(buildAH3("mainSide__searchResults__li__result__D&P__Price__title","Prix :"));
  selectedElement = priceElement.lastChild;
  priceElement.appendChild(buildAP("mainSide__searchResults__li__result__D&P__Price__value",teddy.price + " €"));
  selectedElement = priceElement.lastChild;
};

const insertAllTeddies = (elementSearchResult, teddies) => {
  //FONCTION INSERTION DE TOUT LES RESULTAT GRACE A LA FONCTION BUILDATEDDY
  console.log(elementSearchResult);
  teddies.map((teddy, index) => buildATeddyDiv(teddy, elementSearchResult,index));
};

getTeddies().then((teddies) => {
  //Mise en place de toutes les fonctions
  const searchResultsElement = document.getElementById("searchResults");
  insertAllTeddies(searchResultsElement, teddies);
});