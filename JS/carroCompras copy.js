const $tabla = document.querySelector(".tabla-carrito"),
$templateProductos = document.getElementById("template-carrito").content,
$templatePopup = document.getElementById("popup").content,
$btnConfirmar = document.querySelector(".confirmar"),
$total = document.querySelector(".precio-total"),
$main = document.querySelector("main"),
$fragment = document.createDocumentFragment();

//para entorno de desarrollo en vscode
const traerProductos = async (uri) => {
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

const calcularSubtotal = async () => {
  const porciones = await traerProductos("http://localhost:8080/api/porciones");
  const productos = await traerProductos("http://localhost:8080/api/productos");
  if(productosPorComprar){
    const productosCompra = JSON.parse(productosPorComprar);
    let total = 0;
    productosCompra.forEach((productoCompra) => {
      const productoEncontrado = productos.find(producto => producto.id === productoCompra.producto.id),
            porcionEncontrada = porciones.find(porcion => porcion.id === productoCompra.porcion.id),
            subtotal = porcionEncontrada.factorPrecio * productoEncontrado.precio * productoCompra.cantidad;

      const productoCompraFinal = {
        "id": productoEncontrado.id,
        "imagen": productoEncontrado.urlImagen,
        "nombre": productoEncontrado.nombre,
        "precio": productoEncontrado.precio,
        "porcion": porcionEncontrada.porcion,
        "cantidad": productoCompra.cantidad,
        "subtotal": subtotal
      }

      total += subtotal;
      renderTemplateTabla(productoCompraFinal);
    })
    $total.textContent = `$${total}`;
    const $tbody = $tabla.querySelector("tbody");
    $tbody.insertBefore($fragment, $tbody.firstChild);
  }
}

const renderTemplateTabla = (producto) => {
  $templateProductos.querySelector(".imagen").setAttribute("src", producto.imagen);
  $templateProductos.querySelector(".nombre").textContent = producto.nombre;
  $templateProductos.querySelector(".precio").textContent = `$${producto.precio}`;
  $templateProductos.querySelector(".porcion").textContent = producto.porcion;
  $templateProductos.querySelector(".cantidad").textContent = producto.cantidad;
  $templateProductos.querySelector(".subtotal").textContent = `$${producto.subtotal}`;
  $templateProductos.querySelector(".boton-borrar").dataset.id = producto.id;
  
  let $clon = document.importNode($templateProductos, true);

  $fragment.appendChild($clon);
  //renderTemplate(productoCompraFinal);
}

const renderPopup = async (titulo, parrafo, textoAceptar, cancelar) => {
  $templatePopup.querySelector(".backdrop").removeAttribute("hidden");
  $templatePopup.querySelector("h2").textContent = titulo;
  $templatePopup.querySelector("p").innerHTML = parrafo;
  $templatePopup.querySelector(".aceptar").textContent = textoAceptar;

  //$templatePopup.querySelector(".cancelar");
  if(cancelar){
    $templatePopup.querySelector(".cancelar").removeAttribute("hidden");
  }

  let $clon = document.importNode($templatePopup, true);
  const backdrop = $clon.querySelector(".backdrop");
  let res = await $clon.querySelector(".cancelar").addEventListener("click", async (e) =>{
    backdrop.setAttribute("hidden", null);
    return false;
  })

  res = await $clon.querySelector(".aceptar").addEventListener("click", async (e) =>{
    backdrop.setAttribute("hidden", null);
    return true;
  })

  $fragment.appendChild($clon);
  $main.appendChild($fragment);
  //renderTemplate(productoCompraFinal);
}

const comprar = async (uri, compra) => {
  let headersList = {
    "Content-Type": "application/json",
    "acces-control-allow-origin": "*"
  }

  const requestOptions = {
    method: 'POST',
    headers: headersList,
    body: compra
  };

  try{
    const res = await fetch(uri, requestOptions),
    data = await res.json();
    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }
    return {data, res}
  } catch (error) {
    let message = error.statusText || "Ocurrio un error";
    console.log(message);
  }
}

// Evento click en botón comprar
$btnConfirmar.addEventListener("click", async (e) => {
  const listaProductosCompra = localStorage.getItem("compras");
  const sesion = localStorage.getItem("sesion");

  if(listaProductosCompra && sesion){
    const idUsuario = JSON.parse(sesion).id;
    const nuevaCompra = JSON.stringify({
      "usuario": {"id": idUsuario},
      "productosCompra": JSON.parse(listaProductosCompra)
    });

    const respuesta = await comprar("http://localhost:8080/api/compras", nuevaCompra);
    if(respuesta.res.ok){
      localStorage.removeItem("compras");
      $carritoCantidad.setAttribute("hidden", null);
      $carritoCantidad.textContent = 0;
      const titulo = "Tu compra está en proceso";
      const parrafo = `Gracias por tu compra. Recibirás una llamada de confirmación al número <strong id="telefono"></strong> en el lapso de una hora, donde se verificará el pedido y se llegará a un acuerdo en la forma de pago y de entrega.`;
      const botonAceptar = "Aceptar";
      renderPopup(titulo, parrafo, botonAceptar, false);
    }
  }
})

// Traer todos los productos
calcularSubtotal();

document.addEventListener("click", async (e) => {
  if(e.target.matches(".boton-borrar")){
    const titulo = "Eliminar producto";
    const parrafo = "¿Confirma que desea eliminar el producto de su carrito de compras?";
    const botonAceptar = "Sí, eliminar";
    const confirmacion = await renderPopup(titulo, parrafo, botonAceptar, true);
    console.log(confirmacion);
    if(!confirmacion) return;
    const idABuscar = Number(e.target.dataset.id);
    if(productosPorComprar){
      const productosCompra = JSON.parse(productosPorComprar)
      const nuevaCompra = productosCompra.filter(producto => {
        return producto.producto.id !== idABuscar;
      })
      const nuevaCompraString = JSON.stringify(nuevaCompra);
      localStorage.setItem("compras", nuevaCompraString);
      location.reload();
    }
  }
})