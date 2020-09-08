//onclick sur l'icon font awesome , on recupere les données des inputs a chque fois quelles change dans des let

//RECUPERATION DE LA COULEUR :
//const listenRadioInput = (Elements) => Elements.map( element => element.addEventListener("change",console.log("couleur choisie : " + element.target.value)));

/*const getColor = () =>{
    let Elements = document.getElementsByName("color");
    console.log(Elements);

    Elements = Array.from(Elements);
    console.log(Elements);
    listenRadioInput(Elements);
}*/

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
  return JSON.parse(localStorage.getItem("items"));
};

const creeItem = (_id, quantity, color) => {
  const objet = {
    _id,
    quantity,
    color
  };
  return objet;
};
const item0 = creeItem("5be9c8541c9d440000665243", 2, "Noir");
const item1 = creeItem("5beaa8bf1c9d440000a57d94", 2, "Tan");
console.log(item1, item0);
const items = [item0, item1];
console.log(items);
addToLocalStorage(items);
//setTimeout(AddToCart, 500);
//listenRadioInput();

//FAIRE EN SORTE QUE SI DEUX OBJET ON LE MEME ID ET COLOR SUPPRIME UN ET AJOUTER SA QUANTITY A L'AUTRE AVANT DE LE STOCKER
