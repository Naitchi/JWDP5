const getElementType = async (_id) => {
  //FONCTION POUR RECUPERER LES API
  const response = await fetch("/api/teddies/" + _id);
  if (response.ok) {
    const data = response.json();
    console.log(data);
    return data;
  } else {
    console.log("Retour du serveur : ", response.status);
  }
};

const buildABasket = (basket) => {
  basket.map((item, index) => buildAElement(item, index));
};

const buildAElement = async (item, index) => {
  console.log(item);
  const itemType = await getElementType(item._id);
  const elementParent = document.getElementById("basket__content");
  const element = buildALi(index, "basket__content__element");
  elementParent.appendChild(element);
  element.appendChild(
    buildAImg(
      "basket__content__element__img",
      itemType.imageUrl,
      "Photo de l'ourson"
    )
  );
  element.appendChild(buildACharacteristics(item, itemType));
  element.appendChild(buildAElementOptions(item));
  return element;
};

const buildACharacteristics = (item, itemType) => {
  const element = buildADiv("basket__content__element__characteristics");
  element.appendChild(
    buildATextContent(
      "h3",
      "basket__content__element__characteristics__name",
      itemType.name
    )
  );
  element.appendChild(
    buildATextContent(
      "p",
      "basket__content__element__characteristics__color",
      `couleur : ${item.color}`
    )
  );
  element.appendChild(
    buildATextContent(
      "p",
      "basket__content__element__characteristics__price",
      `${itemType.price}€`
    )
  );
  return element;
};

const buildAElementOptions = (item) => {
  const element = buildADiv("basket__content__element__options");
  element.appendChild(buildANumberAdjust(item));
  element.appendChild(buildADeleteButton());
  return element;
};

const buildANumberAdjust = (item) => {
  const element = buildADiv("basket__content__element__options__numberAdjust");
  element.appendChild(
    buildATextContentWithId(
      "p",
      "basket__content__element__options__numberAdjust__number",
      "number",
      `nombre d'articles : ${item.quantity}`
    )
  );
  element.appendChild(buildAButtonDiv());
  //addOneItem("number",item);
  return element;
};

const buildAButtonDiv = () => {
  const element = buildADiv(
    "basket__content__element__options__numberAdjust__buttonDiv"
  );
  element.appendChild(buildAAddButton());
  element.appendChild(buildARemoveButton());
  return element;
};

const buildAAddButton = () => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__buttonDiv__add",
    "addButton",
    null
  );
  element.appendChild(
    buildAFontAwesomeI(
      [
        "basket__content__element__options__numberAdjust__buttonDiv__add__icon",
        "fas",
        "fa-plus",
        "fa-3x",
      ],
      "lightpink"
    )
  );
  return element;
};

const buildARemoveButton = () => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__buttonDiv__remove",
    "removeButton",
    null
  );
  element.appendChild(
    buildAFontAwesomeI(
      [
        "basket__content__element__options__numberAdjust__buttonDiv__remove__icon",
        "fas",
        "fa-minus",
        "fa-3x",
      ],
      "lightpink"
    )
  );
  return element;
};

const buildADeleteButton = () => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__delete",
    "deleteButton",
    null
  );
  element.appendChild(
    buildAFontAwesomeI(
      [
        "basket__content__element__options__numberAdjust__delete__icon",
        "fas",
        "fa-times",
        "fa-3x",
      ],
      "lightpink"
    )
  );
  return element;
};

/*const addOneItem = (id,item) => {
  const nodeElement = document.getElementById(id);
  console.log(nodeElement);
  const element = document.getElementById("addButton");
  console.log(element);
  //const newLocal = (nodeElement) => {console.log(nodeElement).innerHTML = `nombre d'articles : ${item.quantity++}`};
  element.addEventListener("click", (e) => console.log(e)); 
};*/

/*const testEvent = () => {
  const element = document.getElementById("addButton");
  element.addEventListener("click", (e) => console.log(e)); 
};*/

takeLocalStorageData().then((basket) => {
  buildABasket(basket);
  console.log(basket);
});
