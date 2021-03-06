const buildADiv = (classe) => {
  const newElement = document.createElement("div");
  newElement.classList.add(classe);
  return newElement;
};

const buildAImg = (classe, source, alt) => {
  const newElement = document.createElement("img");
  newElement.classList.add(classe);
  newElement.src = source;
  newElement.alt = alt;
  return newElement;
};

const buildAFontAwesomeI = (classes, color) => {
  const newElement = document.createElement("i");
  newElement.classList.add(...classes);
  newElement.style.color = color;
  return newElement;
};

const buildATextContent = (element, classe, content) => {
  const newElement = document.createElement(element);
  newElement.classList.add(classe);
  newElement.textContent = content;
  return newElement;
};

const buildATextContentWithId = (element, classe, id, content) => {
  const newElement = document.createElement(element);
  newElement.classList.add(classe);
  newElement.setAttribute("id", id);
  newElement.textContent = content;
  return newElement;
};

const buildAA = (classe, content, href) => {
  const newElement = document.createElement("a");
  newElement.classList.add(classe);
  newElement.textContent = content;
  newElement.href = href;
  return newElement;
};

const addAInput = (type, name, value, classe) => {
  const input = document.createElement("input");
  input.classList.add(classe);
  input.type = type;
  input.name = name;
  input.value = value;
  input.id = value;
  return input;
};

const addATextInputWithClass = (type, name, id, classe, required) => {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.classList.add(classe);
  input.id = id;
  input.required = required;
  return input;
};

const addALabel = (classe, content, id) => {
  const newElement = document.createElement("label");
  newElement.classList.add(classe);
  newElement.textContent = content;
  newElement.setAttribute("for", id);
  return newElement;
};

const buildALi = (index, classe) => {
  const newElement = document.createElement("li");
  newElement.classList.add(classe);
  if (index % 2 == 0) {
    newElement.classList.add("--colorBg");
  } else {
    newElement.classList.add("--darkerColorBg");
  }
  return newElement;
};
