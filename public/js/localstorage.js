//onclick sur l'icon font awesome , on recupere les données des inputs a chque fois quelles change dans des let

let Elements = document.getElementsByName("color");
console.log(Elements);

Elements = Array.from(Elements);
console.log(Elements);

const listenRadioInput = () => Elements.map( element => element.addEventListener("change",console.log("couleur choisie : " + element.target.value)));

listenRadioInput();