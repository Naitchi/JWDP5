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
  addToCartButton.onclick = addToLocalStorage(Items);
};

const addToLocalStorage = (Items) => {
  localStorage.setItem("Items", JSON.stringify(Items));
};

const takeLocalStorageData = () => {
  return JSON.parse(localStorage.getItem("Items"));
};

const creeItem = (_id, Quantity, color) => {
  var objet = {};
  objet._id = _id;
  objet.Quantity = Quantity;
  objet.color = color;

  return objet;
};
let item0 = creeItem("5be9c8541c9d440000665243", 2, "Noir");
let item1 = creeItem("5beaa8bf1c9d440000a57d94", 2, "Tan");
console.log(item1, item0);
var Items = [item0, item1];
console.log(Items);
addToLocalStorage(Items);
//setTimeout(AddToCart, 500);
//listenRadioInput();

//FAIRE EN SORTE QUE SI DEUX OBJET ON LE MEME ID ET COLOR SUPPRIME UN ET AJOUTER SA QUANTITY A L'AUTRE AVANT DE LE STOCKER
