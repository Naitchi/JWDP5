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

const buildALi = (index,classe) =>{
  const newElement = document.createElement("li");
  newElement.classList.add(classe);
  if(index%2 == 0){
        newElement.classList.add("--colorBg");
  } else{
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

const buildAFontAwesomeI = (classe1, classe2) =>{
  const newElement = document.createElement("i");
  newElement.classList.add(classe1);
  newElement.classList.add(classe2);
  return newElement;         
}

const buildATextContent = (element,classe, content) =>{
  const newElement = document.createElement(element);
  newElement.classList.add(classe);
  newElement.textContent = content;    
  return newElement;         
}

//fonction pour les div parents 

const buildAResultDiv = (index, teddy) =>{
  const actualElement = buildALi(index,"mainSide__searchResults__result");
  actualElement.appendChild(buildAImg("mainSide__searchResults__result__photo",teddy.imageUrl))
  actualElement.appendChild(buildATextDiv(teddy));
  actualElement.appendChild(buildAPAndDDiv(teddy));
  return actualElement;
}

const buildATextDiv = (teddy) =>{
  const actualElement = buildADiv("mainSide__searchResults__result__text");
  actualElement.appendChild(buildATextContent("h2","mainSide__searchResults__result__text__name",teddy.name));
  actualElement.appendChild(buildATextContent("p","mainSide__searchResults__result__text__description",teddy.description));
  return actualElement;
}

const buildAPAndDDiv = (teddy) =>{
  const actualElement = buildADiv("mainSide__searchResults__result__D&P");
  actualElement.appendChild(buildADispoDiv());
  actualElement.appendChild(buildAPriceDiv(teddy));
  return actualElement;
}

const buildADispoDiv = () =>{
  const actualElement = buildADiv("mainSide__searchResults__result__D&P__Dispo");
  actualElement.appendChild(buildATextContent("h3","mainSide__searchResults__result__D&P__Dispo__title","Dispo :"));
  actualElement.appendChild(buildAFontAwesomeI("fas", "fa-check"));
  return actualElement;
}

const buildAPriceDiv = (teddy) =>{
  const actualElement = buildADiv("mainSide__searchResults__result__D&P__Price");
  actualElement.appendChild(buildATextContent("h3","mainSide__searchResults__result__D&P__Price__title","Prix :"));
  actualElement.appendChild(buildATextContent("p","mainSide__searchResults__result__D&P__Price__value",teddy.price + " €"));
  return actualElement;
}

//FONCTION QUI AJOUTE DU CODE HTML SELON UN RESULTAT
const buildATeddyDiv = (teddy, startingElement, index) => {
  startingElement.appendChild(buildAResultDiv(index, teddy));
};

//FONCTION INSERTION DE TOUT LES RESULTAT GRACE A LA FONCTION BUILDATEDDY
const insertAllTeddies = (elementSearchResult, teddies) => {  
  console.log(elementSearchResult);
  teddies.map((teddy, index) => buildATeddyDiv(teddy, elementSearchResult,index));
};

//Mise en place de toutes les fonctions
getTeddies().then((teddies) => {
  const searchResultsElement = document.getElementById("searchResults");
  insertAllTeddies(searchResultsElement, teddies);
});