const $cardsProductos = document.querySelector(".seccion-productos");
$template = document.getElementById("template-card").content;
$fragment = document.createDocumentFragment();

function renderCards(data) {
  data.forEach((obj) => {
    $template.querySelector("img").setAttribute("src", obj.img);
    $template.querySelector("img").setAttribute("alt", obj.titulo);
    $template.querySelector("h3").textContent = obj.title;
    $template.querySelector("p").textContent = obj.descripcion;
    $template.querySelector("span").textContent = obj.precio;

    let $clon = document.importNode($template, true);
    $fragment.appendChild($clon);
  });
  $cardsProductos.appendChild($fragment);
}

//para entorno de pruebas en vscode
/*
fetch("/JS/productosDesarrollo.json") //despues se cambia por la el endpoint correspondiente de mi apiRest
  .then((response) => response.json())
  .then((data) => {
    renderCards(data);
  })
  .catch((error) => console.error(error));*/


//para entorno de desarrollo con gitHub
fetch("/Pasteleria/JS/productosProduccion.json") //despues se cambia por la el endpoint correspondiente de mi apiRest
  .then((response) => response.json())
  .then((data) => {
    renderCards(data);
  })
  .catch((error) => console.error(error));