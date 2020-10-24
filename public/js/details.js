const getTeddy = () => {
  //FONCTION POUR RECUPERER LES API
  const parsedUrl = new URL(window.location.href);
  return fetch(
    "/api/teddies/" + parsedUrl.searchParams.get("_id")
  )
    .then((response) =>{
      if (response.ok){
        return response.json();
      }
      else{
        console.log("Retour du serveur : ", response.status);
        document.location.href = "../html/404.html";    
      }
    }) 
    .then((data) => {
    console.log(data);
    return data;
  });
};

const addAInputRadio = (nodeElement, name, value, index) => {
  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;
  input.id = value;
  if (index === 0) {
    input.required = true;
  }
  nodeElement.appendChild(input);
  nodeElement.appendChild(
    addALabel("element__buySect__colorSect__color__label", value, value)
  );
};

const buildPresentationText = (item) => {
  const actualElement = buildADiv("element__presentation__text");
  actualElement.appendChild(
    buildATextContent("h1", "element__presentation__text__title", item.name)
  );
  actualElement.appendChild(
    buildATextContent(
      "h2",
      "element__presentation__text__description",
      item.description
    )
  );
  actualElement.appendChild(
    buildATextContent(
      "h3",
      "element__presentation__text__price",
      "Prix :" + (item.price / 100).toFixed(2) + "€"
    )
  );
  return actualElement;
};

const buildAElementPresentation = (item) => {
  const actualElement = buildADiv("element__presentation");
  actualElement.appendChild(
    buildAImg("element__presentation__img", item.imageUrl, "Photo de l'ourson")
  );
  actualElement.appendChild(buildPresentationText(item));
  return actualElement;
};

const buildAColorChoice = (teddy) => {
  const actualElement = buildADiv("element__buySect__colorSect__color");
  addAListOfUniqueChoices(actualElement, "color", teddy.colors);
  return actualElement;
};

const buildAAddToCart = (teddy) => {
  const actualElement = buildATextContentWithId(
    "button",
    "element__buySect__addToCart",
    "addToCartButton",
    ""
  );
  actualElement.appendChild(
    buildAFontAwesomeI(["fas", "fa-cart-arrow-down", "fa-3x"], "#008000")
  );
  actualElement.addEventListener("click", () => {
    getAnOrder(teddy);
  });
  return actualElement;
};

const buildAColorDiv = (item) => {
  const actualElement = buildADiv("element__buySect__colorSect");
  actualElement.appendChild(
    buildATextContent(
      "h3",
      "element__buySect__colorSect__title",
      "Choissisez la couleur de votre ourson !"
    )
  );
  actualElement.appendChild(buildAColorChoice(item));
  return actualElement;
};

const buildABuySect = (item) => {
  const actualElement = buildADiv("element__buySect");
  actualElement.appendChild(
    addALabel(
      "element__buySect__labelNumber",
      "Nombre de nounours : ",
      "nombreDeNounours"
    )
  );
  actualElement.appendChild(addAInput("number", "number", "nombreDeNounours"));
  actualElement.appendChild(buildAColorDiv(item));
  actualElement.appendChild(buildAAddToCart(item));
  return actualElement;
};

const addAListOfUniqueChoices = (nodeElement, name, choices) =>
  choices.map((choice, index) =>
    addAInputRadio(nodeElement, name, choice, index)
  );

const buildAItemPage = (parentElement, item) => {
  parentElement.appendChild(buildAElementPresentation(item));
  parentElement.appendChild(buildABuySect(item));
};

getTeddy().then((teddy) => {
  const parentElement = document.getElementById("element");
  console.log(parentElement);
  buildAItemPage(parentElement, teddy);
});

const getAnOrder = (teddy) => {
  const quantity = +document.getElementById("nombreDeNounours").value;
  if (quantity > 0 && quantity !== null) {
    const color = document.querySelector('input[name="color"]:checked').value;
    let localStorage = takeLocalStorageData();
    console.log(typeof localStorage);
    if (
      localStorage.some(
        (storage) => storage._id === teddy._id && storage.color === color
      )
    ) {
      localStorage = localStorage.map((storage) => {
        if (storage._id === teddy._id && storage.color === color) {
          storage.quantity += quantity;
          console.log(storage);
        }
        return storage;
      });
    } else {
      const newItem = creeItem(teddy._id, quantity, color);
      localStorage.push(newItem);
    }
    addToLocalStorage(localStorage);
    console.log(localStorage);
  } else {
    alert("veuillez rentrer un nombre valide");
  }
  console.log(teddy.colors);
};
