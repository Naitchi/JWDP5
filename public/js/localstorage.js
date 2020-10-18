//RECUPERATION DE L'AJOUT AU PANIER

const AddToCart = () => {
  const addToCartButton = document.getElementById("addToCartButton");
  addToCartButton.onclick = addToLocalStorage(items);
};

const addToLocalStorage = (items) =>
  localStorage.setItem("items", JSON.stringify(items));

const takeLocalStorageData = () => {
  return localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
};

const creeItem = (_id, quantity, color) => {
  return {
    _id,
    quantity,
    color,
  };
};
