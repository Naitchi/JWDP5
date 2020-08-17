const getTeddy = async () => {
    //FONCTION POUR RECUPERER LES API
    const parsedUrl = new URL(window.location.href);
    try {
      const response = await fetch("/api/teddies/" + parsedUrl.searchParams.get("_id"));
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.log("Retour du serveur : ", response.status);
        document.location.href="../html/404.html";
      }
    } catch (error) {
      console.log(error);
      document.location.href="../html/404.html";
    }
  };

const addImg = (nodeElement,img) =>{
 nodeElement.src = img;
 console.log(nodeElement);
}

const addText = (nodeElement,text) =>{
  nodeElement.textContent = text;
  console.log(nodeElement);
}

const addAInput = (nodeElement, name, value)=>{
  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;
  input.text = value;
  nodeElement.appendChild(input);
}

const addAListOfUniqueChoices = (nodeElement,name,choices)=>{  
  (choices.map( (choice) => (addAInput (nodeElement,name,choice)) ) );
}

getTeddy().then((teddy) => {
  const nameElement = document.getElementsByClassName("element__presentation__text__tilte");
  console.log(nameElement);
  addText(nameElement,teddy.name);
  console.log(nameElement);
  const imgElement = document.getElementsByClassName("element__presentation__img");
  console.log(teddy.imageUrl);
  addImg(imgElement,teddy.imageUrl);
  const descElement = document.getElementsByClassName("element__presentation__text__description");
  addText(descElement,teddy.description);
  const priceElement = document.getElementsByClassName("element__presentation__text__price");
  addText(priceElement,"Prix :" + teddy.price);
});
