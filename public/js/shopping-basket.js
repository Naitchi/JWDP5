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

const creeContact = () => {
  const contact = {
    firstName: document.querySelector('input[name="prenom"]').value,
    email: document.querySelector('input[name="email"]').value,
    city: document.querySelector('input[name="city"]').value,
    lastName: document.querySelector('input[name="nom"]').value,
    address: document.querySelector('input[name="adress"]').value,
  };
  return contact;
};

const buildABasket = (basket) => {
  basket.map((item, index) => buildAElement(item, index));
};

const buildAElement = async (item, index) => {
  console.log(item);
  const elementParent = document.getElementById("basket__content");
  const itemType = await getElementType(item._id);
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
      `${(itemType.price / 100).toFixed(2)}€`
    )
  );
  return element;
};

const buildAElementOptions = (item) => {
  const element = buildADiv("basket__content__element__options");
  element.appendChild(buildANumberAdjust(item));
  element.appendChild(buildADeleteButton(item));
  return element;
};

const buildANumberAdjust = (item) => {
  const element = buildADiv("basket__content__element__options__numberAdjust");
  element.appendChild(
    buildATextContent(
      "p",
      "basket__content__element__options__numberAdjust__number",
      `nombre d'articles :`
    )
  );
  element.appendChild(
    buildATextContentWithId("span", 0, "qty-" + item._id, item.quantity)
  );
  element.appendChild(buildAButtonDiv(item));
  return element;
};

const buildAButtonDiv = (item) => {
  const element = buildADiv(
    "basket__content__element__options__numberAdjust__buttonDiv"
  );
  element.appendChild(buildAAddButton(item));
  element.appendChild(buildARemoveButton(item));
  return element;
};

const buildAAddButton = (item) => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__buttonDiv__add",
    "addButton",
    null
  );
  element.addEventListener("click", () => {
    console.log(item);
    const qty = document.getElementById("qty-" + item._id);
    if (qty.innerHTML < 10) {
      qty.innerHTML++;
      let array = takeLocalStorageData();
      array.map((teddy) => {
        if (teddy._id === item._id) {
          teddy.quantity++;
          console.log(teddy.quantity);
        }
      });
      console.log(array);
      addToLocalStorage(array);
    } else {
      alert("veuillez mettre un chiffre inférieur à 10");
    }
    console.log(qty.innerHTML);
  });
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

const buildARemoveButton = (item) => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__buttonDiv__remove",
    "removeButton",
    null
  );
  element.addEventListener("click", () => {
    console.log(item);
    const qty = document.getElementById("qty-" + item._id);
    if (qty.innerHTML > 1) {
      qty.innerHTML--;
      let array = takeLocalStorageData();
      array.map((teddy) => {
        if (teddy._id === item._id) {
          teddy.quantity--;
          console.log(teddy.quantity);
        }
      });
      addToLocalStorage(array);
    } else {
      alert("veuillez mettre un chiffre acceptable");
    }
    console.log(qty.innerHTML);
  });
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

const buildADeleteButton = (item) => {
  const element = buildATextContentWithId(
    "button",
    "basket__content__element__options__numberAdjust__delete",
    "deleteButton",
    null
  );
  element.addEventListener("click", () => {
    console.log(item);
    let array = takeLocalStorageData();
    array.map((teddy, index) => {
      console.log(index);
      if (teddy._id === item._id) {
        array.splice(index, 1);
        console.log(array);
        addToLocalStorage(array);
        history.go(0);
      }
    });
  });
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

const basket = takeLocalStorageData();
if (basket == 0) {
  const elementParent = document.getElementById("basket__content");
  elementParent.appendChild(
    buildATextContent(
      "p",
      "basket__content__empty",
      "pas d'article dans le panier pour l'instant"
    )
  );
}

const purchase = (url, contact, products) => {
  const data = {
    contact,
    products,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options).then((response) => response.json());
};

console.log(basket);
buildABasket(basket);
const btnForm = document.getElementById("submit");
btnForm.addEventListener("click", () => {
  const email = document.querySelector('input[name="email"]').value;
  const regexEmailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[a-zA-Z\-0-9]+\.+[a-zA-Z]{2,}$/;
  if (regexEmailValidator.test(email)) {
    const url = "/api/teddies/order";
    const contact = creeContact();
    console.log(contact);
    const basket = takeLocalStorageData();
    let products = [];
    basket.map((item) => products.push(item._id));
    console.log("orderid = ", purchase(url, contact, products));
  } else {
    alert("veuillez rentrer une adresse mail valide");
  }
});
