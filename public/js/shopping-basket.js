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
  basket.map((Item, index) => buildAElement(Item, index));
};

const buildAElement = async (Item, index) => {
  console.log(Item);
  const ItemType = await getElementType(Item._id);
  const elementParent = document.getElementById("basket__content");
  const element = buildALi(index, "basket__content__element");
  elementParent.appendChild(element);
  element.appendChild(
    buildAImg(
      "basket__content__element__img",
      ItemType.imageUrl,
      "Photo de l'ourson"
    )
  );
  element.appendChild(buildACharacteristics(Item, ItemType));
  element.appendChild(buildAElementOptions(Item));
  return element;
};

const buildACharacteristics = (Item, ItemType) => {
  const element = buildADiv("basket__content__element__characteristics");
  element.appendChild(
    buildATextContent(
      "h3",
      "basket__content__element__characteristics__name",
      ItemType.name
    )
  );
  element.appendChild(
    buildATextContent(
      "p",
      "basket__content__element__characteristics__color",
      Item.color
    )
  );
  element.appendChild(
    buildATextContent(
      "p",
      "basket__content__element__characteristics__price",
      ItemType.price + "€"
    )
  );
  return element;
};

const buildAElementOptions = (Item) => {
  const element = buildADiv("basket__content__element__options");
  element.appendChild(buildANumberAdjust(Item));
  element.appendChild(buildADeleteButton());
  return element;
};

const buildANumberAdjust = (Item) => {
  const element = buildADiv("basket__content__element__options__numberAdjust");
  element.appendChild(
    buildATextContent(
      "p",
      "basket__content__element__options__numberAdjust__number",
      Item.Quantity
    )
  );
  element.appendChild(buildAAddButton());
  element.appendChild(buildARemoveButton());
  return element;
};

const buildAAddButton = () => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__number__add",
    "addButton",
    null
  );
  element.appendChild(
    buildAFontAwesomeI(
      [
        "basket__content__element__options__numberAdjust__number__add__icon",
        "fas",
        "fa-plus",
        "fa-3x",
      ],
      "white"
    )
  );
  return element;
};

const buildARemoveButton = () => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__number__remove",
    "removeButton",
    null
  );
  element.appendChild(
    buildAFontAwesomeI(
      [
        "basket__content__element__options__numberAdjust__number__remove__icon",
        "fas",
        "fa-minus",
        "fa-3x",
      ],
      "white"
    )
  );
  return element;
};

const buildADeleteButton = () => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__number__delete",
    "deleteButton",
    null
  );
  element.appendChild(
    buildAFontAwesomeI(
      [
        "basket__content__element__options__numberAdjust__number__delete__icon",
        "fas",
        "fa-times",
        "fa-3x",
      ],
      "white"
    )
  );
  return element;
};

const basket = takeLocalStorageData();
console.log(basket);
buildABasket(basket);
