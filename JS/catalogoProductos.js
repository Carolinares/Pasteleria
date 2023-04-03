const $cardsProductos = document.querySelector(".seccion-productos"),
  $template = document.getElementById("template-card").content,
  $fragment = document.createDocumentFragment();

function renderCards(productos, porciones) {
  productos.forEach((producto) => {
    const precio = Number(producto.precio);

    $template.querySelector("img").setAttribute("src", producto.urlImagen);
    $template.querySelector("img").setAttribute("alt", producto.nombre);
    $template.querySelector("h3").textContent = producto.nombre;
    $template.querySelector(".descripcion").textContent = producto.descripcion;
    $template.querySelector(".precio").textContent = `$${producto.precio}`;
    $template.querySelector(".unidades-value").dataset.producto = producto.id;
    $template.querySelector(".comprar").dataset.producto = producto.id;
    $template.querySelector(".carrito").dataset.producto = producto.id;
    $template.querySelector(".card-productos").setAttribute("id", producto.id);
    $template.querySelector(".card-productos").dataset.precio = producto.precio;

    let $clon = document.importNode($template, true);

    //**********EDICIONES SOBRE EL CLON***********
    //Generar porciones dentro de cada tarjeta
    const $clonFormPorciones = $clon.querySelector(".lista-porciones"),
      $clonPrecio = $clon.querySelector(".precio"),
      $botonesComprar = $clon.querySelector(".buttons");

      //quitar opcion de compra para administradores
      if(sesion){
        const user = JSON.parse(sesion);
        if(user.rol === "Administrador"){
          $botonesComprar.setAttribute("hidden", null);
        }
      }

    porciones.forEach((porcion) => {
      const porcionElement = document.createElement("div");
      porcionElement.classList.add("porcion-container");
      const template = `
        <input type="radio" class="input-porcion" name="porcion" id="porcion-${porcion.id}-${producto.id}" hidden data-factor="${porcion.factorPrecio}" data-producto="${producto.id}" data-id="${porcion.id}">
        <label class="porcion" for="porcion-${porcion.id}-${producto.id}">
          <span class="check">✔</span>
          <span>${porcion.porcion}</span>
          <span>porciones</span>
        </label>
      `
      porcionElement.innerHTML = template;
      $clonFormPorciones.appendChild(porcionElement);
    })
    
    //Establecer por defecto porción 2-4
    $clonFormPorciones.children[0].children[0].setAttribute("checked", null)
    //Cambia cantidad
    $clon.querySelector(".unidades-value").addEventListener('change', (e) => {
      $clonPrecio.innerText = `$${precio * e.target.value}`;
      //Si cambia la cantidad, traiga el valor de factor y de precio y multiplique los tres
    });

    //Reenderizar clon en el DOM
    $fragment.appendChild($clon);
  });
  $cardsProductos.appendChild($fragment);
}

//para entorno de desarrollo en vscode
const getProductos = async () => {
  const productos = await getAPI("http://localhost:8080/api/productos");
  getPorciones(productos);
}
const getPorciones = async (productos) => {
  const porciones = await getAPI("http://localhost:8080/api/porciones");
  renderCards(productos, porciones)
}

//para entorno de pruebas en Github
/* const getProductos = async () => {
  const productos = await getAPI("/Pasteleria/JS/productosProduccion.json");
  getPorciones(productos);
}  

const getPorciones = async (productos) => {
  const porciones = await getAPI("/Pasteleria/JS/porciones.json");
  renderCards(productos, porciones)
} */

const getAPI = async (uri) => {
  let headersList = {
    "Content-Type": "application/json",
    "acces-control-allow-origin": "*"
   }

  try{
    const res = await fetch(uri,{
      headers: headersList
    }),
    data = await res.json();
    return data
  } catch (err) {
    return err
  }
}

document.addEventListener("change", (e) => {
  if(e.target.name === "porcion"){
    const productoId = e.target.dataset.producto;
    const $card = document.getElementById(productoId);
    const $precioElement = $card.querySelector(".precio");

    const factor = Number(e.target.dataset.factor);
    const precio = Number($card.dataset.precio);
    const cantidad = Number($card.querySelector(".unidades-value").value);

    $precioElement.textContent = `$${precio * factor * cantidad}`;
  }

  if(e.target.name === "cantidad"){
    const productoId = e.target.dataset.producto;
    const $card = document.getElementById(productoId);
    const $precioElement = $card.querySelector(".precio");
    const $inputFactor = $card.querySelector('.input-porcion[type="radio"]:checked');

    const factor = Number($inputFactor.dataset.factor);
    const precio = Number($card.dataset.precio);
    const cantidad = Number(e.target.value);

    $precioElement.textContent = `$${precio * factor * cantidad}`;
  }
})

getProductos();

document.addEventListener("click", (e) => {
  //Ir a página carrito compras
  if(e.target.matches(".comprar") || e.target.matches(".carrito")){
    productosPorComprar = localStorage.getItem("compras");
    const productoId = Number(e.target.dataset.producto);
    const $card = document.getElementById(productoId);
    const $inputFactor = $card.querySelector('.input-porcion[type="radio"]:checked');
    const porcionId = Number($inputFactor.dataset.id);
    const cantidad = Number($card.querySelector(".unidades-value").value);

    const nuestroProducto = {
      "producto": {
        "id": productoId
      },
      "porcion": {
        "id": porcionId
      },
      "cantidad": cantidad
    };

    if(productosPorComprar){
      const listaProductos = JSON.parse(productosPorComprar);
      //Agregar producto
      listaProductos.push(nuestroProducto);
      const listaProductosString = JSON.stringify(listaProductos);
      localStorage.setItem('compras', listaProductosString);
    } else {
      //Agregar primer producto
      const nuevoProducto = JSON.stringify([nuestroProducto])
      localStorage.setItem('compras', nuevoProducto);
    }

    productosPorComprar = localStorage.getItem("compras");
    
    //Mostrar total de productos en carrito
    if(productosPorComprar){
      listaProductos = JSON.parse(productosPorComprar);
      $carritoCantidad.removeAttribute("hidden");
      let cantidadTotal = 0;
      listaProductos.forEach((producto) => {
        cantidadTotal += producto.cantidad
      })
      $carritoCantidad.textContent = cantidadTotal;
    }

    if(e.target.matches(".comprar")){
      const location = sesion ? "carroCompras" : "login";
      window.location.href = `./${location}.html`;
    }
  }
})