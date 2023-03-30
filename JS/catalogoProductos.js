const $cardsProductos = document.querySelector(".seccion-productos"),
  $template = document.getElementById("template-card").content,
  $fragment = document.createDocumentFragment();

function renderCards(productos, porciones) {
  productos.forEach((obj) => {
    const precio = Number(obj.precio);
    $template.querySelector("img").setAttribute("src", obj.img);
    $template.querySelector("img").setAttribute("alt", obj.titulo);
    $template.querySelector("h3").textContent = obj.titulo;
    $template.querySelector(".descripcion").textContent = obj.descripcion;
    $template.querySelector(".precio").textContent = `$${obj.precio}`;

    let $clon = document.importNode($template, true);

    const $formPorciones = $clon.querySelector(".lista-porciones");
    porciones.forEach((porc) => {
      const porcion = document.createElement("div");
      porcion.classList.add("porcion-container");
      const template = `
        <input type="radio" name="porcion" id="porcion-${porc.id}-${obj.id}" hidden data-factor="${porc.factorPrecio}">
        <label class="porcion" for="porcion-${porc.id}-${obj.id}">
          <span class="check">✔</span>
          <span>${porc.descripcion}</span>
          <span>porciones</span>
        </label>
      `
      porcion.innerHTML = template;
      $formPorciones.appendChild(porcion);
    })
    $formPorciones.children[0].children[0].setAttribute("checked", "true")
    const $clonPrecio = $clon.querySelector(".precio");
    $clon.querySelector(".unidades-value").addEventListener('change', (e) => {
      $clonPrecio.innerText = `$${precio * e.target.value}`;
    });

    $fragment.appendChild($clon);
  });
  $cardsProductos.appendChild($fragment);
}



/* //para entorno de pruebas en vscode
const getProductos = async () => {
  const productos = await getAPI("/JS/productosDesarrollo.json");
  getPorciones(productos);
} */

//para entorno de produccion en Github
const getProductos = async () => {
  const productos = getAPI("/Pasteleria/JS/productosProduccion.json");
  getPorciones(productos);
} 

const getPorciones = async (productos) => {
  const porciones = await getAPI("/JS/porciones.json");
  renderCards(productos, porciones)
}


const getAPI = async (uri) => {
  try{
    const res = await fetch(uri),
    data = await res.json();
    return data
  } catch (err) {
    return err
  }
}

getProductos();