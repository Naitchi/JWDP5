const getTeddy = async () => {
  //FONCTION POUR RECUPERER LES API
  const parsedUrl = new URL(window.location.href);
  const response = await fetch("/api/teddies/" + parsedUrl.searchParams.get("_id"));
  if (response.ok) {
    const data = response.json();
    console.log(data);
    return data;
  } else {
    console.log("Retour du serveur : ", response.status);
    document.location.href = "../html/404.html";
  }
};

const addAInputRadio = (nodeElement, name, value) => {
  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;
  input.id = value;
  nodeElement.appendChild(input);
  nodeElement.appendChild(addALabel("element__buySect__colorSect__color__label", value, value));
}

const buildPresentationText = (item) => {
  const actualElement = buildADiv("element__presentation__text");
  actualElement.appendChild(buildATextContent("h1", "element__presentation__text__title", item.name));
  actualElement.appendChild(buildATextContent("h2", "element__presentation__text__description", item.description));
  actualElement.appendChild(buildATextContent("h3", "element__presentation__text__price", "Prix :" + item.price + "€"));
  return actualElement;
}

const buildAElementPresentation = (item) => {
  const actualElement = buildADiv("element__presentation");
  actualElement.appendChild(buildAImg("element__presentation__img", item.imageUrl, "Photo de l'ourson"));
  actualElement.appendChild(buildPresentationText(item));
  return actualElement;
}

const buildAColorChoice = (teddy) => {
  const actualElement = buildADiv("element__buySect__colorSect__color");
  addAListOfUniqueChoices(actualElement, "color", teddy.colors);
  return actualElement;
}

const buildAAddToCart = () => {
  const actualElement = buildATextContentWithId("button", "element__buySect__addToCart", "addToCartButton", "");
  actualElement.appendChild(buildAFontAwesomeI(["fas", "fa-cart-arrow-down", "fa-3x"], "#008000"));
  return actualElement;
}

const buildAColorDiv = (item) => {
  const actualElement = buildADiv("element__buySect__colorSect");
  actualElement.appendChild(buildATextContent("h3", "element__buySect__colorSect__title", "Choissisez la couleur de votre ourson !"));
  actualElement.appendChild(buildAColorChoice(item));
  return actualElement;
}

const buildABuySect = (item) => {
  const actualElement = buildADiv("element__buySect");
  actualElement.appendChild(addALabel("element__buySect__labelNumber", "Nombre de nounours : ", "1"));
  actualElement.appendChild(addAInput("number", "number", "1"));
  actualElement.appendChild(buildAColorDiv(item));
  actualElement.appendChild(buildAAddToCart());
  return actualElement;
}

const addAListOfUniqueChoices = (nodeElement, name, choices) => choices.map(choice => addAInputRadio(nodeElement, name, choice));

const buildAItemPage = (parentElement, item) => {
  parentElement.appendChild(buildAElementPresentation(item));
  parentElement.appendChild(buildABuySect(item));
}

getTeddy().then((teddy) => {
  const parentElement = document.getElementById("element");
  console.log(parentElement);
  buildAItemPage(parentElement, teddy);
});