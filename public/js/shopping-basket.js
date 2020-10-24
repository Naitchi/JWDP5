const getElementType = (_id) => {
  //FONCTION POUR RECUPERER LES API
  return fetch("/api/teddies/" + _id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
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

const buildABasket = async (basket) => {
  basket.map((item, index) => {
    buildAElement(item, index);
  });
};

const buildAElement = async (item, index) => {
  const element = buildALi(index, "basket__content__element");
  const elementParent = document.getElementById("basket__content");
  elementParent.appendChild(element);
  const itemType = await getElementType(item._id);
  element.appendChild(
    buildAImg(
      "basket__content__element__img",
      itemType.imageUrl,
      "Photo de l'ourson"
    )
  );
  element.appendChild(buildACharacteristics(item, itemType));
  element.appendChild(buildAElementOptions(item));
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
    buildATextContentWithId(
      "span",
      0,
      "qty-" + item._id + item.color,
      item.quantity
    )
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
    const qty = document.getElementById("qty-" + item._id + item.color);
    if (qty.innerHTML < 10) {
      qty.innerHTML++;
      let array = takeLocalStorageData();
      array.map((teddy) => {
        if (teddy._id === item._id && teddy.color === item.color) {
          teddy.quantity++;
          console.log(teddy.quantity);
        }
      });
      console.log(array);
      addToLocalStorage(array);
      addATotalPrice();
    } else {
      alert("veuillez mettre un chiffre inférieur à 10");
    }
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
    const qty = document.getElementById("qty-" + item._id + item.color);
    if (qty.innerHTML > 1) {
      qty.innerHTML--;
      let array = takeLocalStorageData();
      array.map((teddy) => {
        if (teddy._id === item._id && teddy.color === item.color) {
          teddy.quantity--;
          console.log(teddy.quantity);
        }
      });
      addToLocalStorage(array);
      addATotalPrice();
    } else {
      alert("veuillez mettre un chiffre acceptable");
    }
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
      if (teddy._id === item._id && teddy.color === item.color) {
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

const ifEmpty = (basket) => {
  if (basket == 0) {
    const elementParent = document.getElementById("basket__content");
    elementParent.appendChild(
      buildATextContent(
        "p",
        "basket__content__empty",
        "pas d'article dans le panier pour l'instant"
      )
    );
  } else {
    buildAContact();
    buildATotalPrice();
  }
};

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

const checkAndSend = async () => {
  const email = document.querySelector('input[name="email"]').value;
  const regexEmailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[a-zA-Z\-0-9]+\.+[a-zA-Z]{2,}$/;
  if (regexEmailValidator.test(email)) {
    const url = "/api/teddies/order";
    const contact = creeContact();
    console.log(contact);
    const basket = takeLocalStorageData();
    let products = [];
    basket.map((item) => products.push(item._id));
    const price = await calculTotalPrice();
    purchase(url, contact, products).then((order) => {
      console.log(order);
      document.location.href = `../html/confirmation.html?orderId= ${order.orderId}&price=${price}`;
    });
  } else {
    alert("veuillez rentrer une adresse mail valide");
  }
};

const calculTotalPrice = async () => {
  const basket = takeLocalStorageData();
  let totalPrice = 0;
  await Promise.all(
    basket.map(async (item) => {
      console.log(item);
      const itemType = await getElementType(item._id);
      console.log(itemType);
      totalPrice += item.quantity * itemType.price;
    })
  );
  return totalPrice;
};

const buildContactInput = () => {
  const element = buildATextContent("p", "contact", "");
  element.appendChild(addALabel("contact-label", "Votre prénom :", "prenom"));
  element.appendChild(
    addATextInputWithClass("text", "prenom", "prenom", "contact-input", "true")
  );
  element.appendChild(addALabel("contact-label", "Votre nom :", "nom"));
  element.appendChild(
    addATextInputWithClass("text", "nom", "nom", "contact-input", "true")
  );
  element.appendChild(addALabel("contact-label", "Votre adresse :", "adress"));
  element.appendChild(
    addATextInputWithClass("text", "adress", "adress", "contact-input", "true")
  );
  element.appendChild(addALabel("contact-label", "Votre ville :", "city"));
  element.appendChild(
    addATextInputWithClass("text", "city", "city", "contact-input", "true")
  );
  element.appendChild(
    addALabel("contact-label", "Votre adresse mail :", "email")
  );
  element.appendChild(
    addATextInputWithClass("email", "email", "email", "contact-input", "true")
  );
  element.appendChild(
    addAInput("submit", "envoyer", "Envoyer", "contact-input-btnSend")
  );
  return element;
};

const buildAContact = () => {
  const elementParent = document.getElementById("contact");
  elementParent.appendChild(buildContactInput());
  const btnForm = document.getElementById("Envoyer");
  btnForm.addEventListener("click", () => {
    checkAndSend();
  });
};

const addATotalPrice = async () => {
  const basket = takeLocalStorageData();
  let totalPrice = 0;
  await Promise.all(
    basket.map(async (item) => {
      const itemType = await getElementType(item._id);
      totalPrice += item.quantity * itemType.price;
    })
  );
  const element = document.getElementById("basket__totalPrice__p");
  element.innerHTML = `Prix total : ${(totalPrice / 100).toFixed(2)} €`;
};

const buildATotalPrice = () => {
  const elementParent = document.getElementById("basket");
  elementParent.append(buildAPriceDiv());
};

const buildAPriceDiv = () => {
  const newElement = document.createElement("div");
  newElement.classList.add("basket__totalPrice");
  newElement.appendChild(
    buildATextContentWithId(
      "p",
      "basket__totalPrice__p",
      "basket__totalPrice__p",
      ""
    )
  );
  return newElement;
};

const basket = takeLocalStorageData();
buildABasket(basket);
ifEmpty(basket);
addATotalPrice();
