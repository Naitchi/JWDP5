const getOrderId = async () => {
  //FONCTION POUR RECUPERER LES API
  const parsedUrl = new URL(window.location.href);
  const orderId = parsedUrl.searchParams.get("orderId");
  const price = parsedUrl.searchParams.get("price");
  const response = [orderId, price];
  console.log(response);
  return response;
};

getOrderId().then((parametres) => {
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.innerHTML = `"${parametres[0]}"`;
  const priceElement = document.getElementById("price");
  priceElement.innerHTML = `vous en avez pour un total de ${(
    parametres[1] / 100
  ).toFixed(2)}€`;
});
resetLocalStorage();
