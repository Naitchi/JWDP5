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
        document.location.href="../html/404.html";
      }
  };

const addAInput = (nodeElement, name, value)=>{
  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;
  input.text = value;
  nodeElement.appendChild(input);
}

const buildPresentationText = (item) =>{
  const actualElement = buildADiv("element__presentation__text");
  actualElement.appendChild(buildATextContent("h1","element__presentation__text__tilte",item.name));
  actualElement.appendChild(buildATextContent("h2","element__presentation__text__description",item.description));
  actualElement.appendChild(buildATextContent("h3","element__presentation__text__price","Prix :" + item.price + "€"));
  return actualElement;
}

const buildAElementPresentation = (item) =>{
  const actualElement = buildADiv("element_presentation");
  actualElement.appendChild(buildAImg("element__presentation__img",item.imageUrl));
  actualElement.appendChild(buildPresentationText(item));
  return actualElement;
}

const buildAColorChoice = (teddy) =>{
  const actualElement = buildADiv("element__buySect__color");
  addAListOfUniqueChoices(actualElement,"color",teddy.colors);
  return actualElement;
}

const buildAAddToCart = () =>{
  const actualElement = buildADiv("element__buySect__addToCart");
  actualElement.appendChild(buildAFontAwesomeI(["fas", "fa-cart-arrow-down", "fa-3x"],"#008000"));
  return actualElement;
}

const buildAbuySect = (item) =>{
  const actualElement = buildADiv("element__buySect");
  actualElement.appendChild(buildAColorChoice(item));
  actualElement.appendChild(buildAAddToCart());
  return actualElement;
}

const addAListOfUniqueChoices = (nodeElement, name, choices) => choices.map(choice => addAInput(nodeElement, name, choice));

const buildAItemPage = (parentElement, item) =>{
  parentElement.appendChild(buildAElementPresentation(item));
  parentElement.appendChild(buildAbuySect(item));

  /*<div class="element__presentation">
        <img class="element__presentation__img">
        <div class="element__presentation__text">
            <h1 class="element__presentation__text__tilte"></h1> 
            <h2 class="element__presentation__text__description"></h2>
            <h3 class="element__presentation__text__price"></h3>
        </div>
    </div>
    <div class="element__buySect">
        <div class="element__buySect__color"></div>
        <div class="element__buySect__addToCart"><i class="fas fa-cart-arrow-down fa-3x"></i></div>
    </div>*/
}

getTeddy().then((teddy) => {
  const parentElement = document.getElementsByClassName("element");
  console.log(parentElement);
  buildAItemPage(parentElement,teddy);
});
