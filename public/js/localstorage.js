//RECUPERATION DE L'AJOUT AU PANIER

const AddToCart = () => {
  const addToCartButton = document.getElementById("addToCartButton");
  console.log(addToCartButton);
  addToCartButton.onclick = addToLocalStorage(items);
};

const addToLocalStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

const takeLocalStorageData = () => {
  return localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
};

const creeItem = (_id, quantity, color) => {
  const objet = {
    _id,
    quantity,
    color,
  };
  return objet;
};

