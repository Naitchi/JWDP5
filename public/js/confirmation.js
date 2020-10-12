const getOrderId = async () => {
  //FONCTION POUR RECUPERER LES API
  const parsedUrl = new URL(window.location.href);
  const response = parsedUrl.searchParams.get("orderId");
  return response;
};

const getTeddy = async (_id) => {
  //FONCTION POUR RECUPERER LES API
  const response = await fetch(
    "/api/teddies/" + _id
  );
  if (response.ok) {
    const data = response.json();
    console.log(data);
    return data;
  } else {
    console.log("Retour du serveur : ", response.status);
    document.location.href = "../html/404.html";
  }
};

const calculCost = () => {
  const basket = takeLocalStorageData();
  let totalPrice = 0;
  basket.map((item) => {
    let teddy = getTeddy(item._id);
    console.log(totalPrice);
    console.log(item.quantity);
    console.log(teddy.price);
    totalPrice = totalPrice + item.quantity * teddy.price;
  });
  return totalPrice;
};

getOrderId().then((orderId) => {
    console.log(calculCost());
});
