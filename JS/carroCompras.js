import * as api from "../services/api.service.js";

const $tabla = document.querySelector(".tabla-carrito"),
$templateProductos = document.getElementById("template-carrito").content,
$backdrop = document.querySelector(".backdrop"),
$telefono = document.getElementById("telefono"),
$backdropEliminar = document.querySelector(".backdrop-eliminar"),
$btnConfirmar = document.querySelector(".confirmar"),
$total = document.querySelector(".precio-total"),
sesionObject = JSON.parse(sesion),
$btnEliminar = document.querySelector(".eliminar"),
$fragment = document.createDocumentFragment();

let compraConfirmada = {};

const mostrarProductosCarrito = async () => {
  const respuestaProductos = await api.getAllProductos();
  if(!respuestaProductos.res.ok)return;
  const productos = respuestaProductos.data;

  const respuestaPorciones = await api.getAllPorciones();
  if(!respuestaPorciones.res.ok)return;
  const porciones = respuestaPorciones.data;

  if(productosPorComprar){
    const productosCompra = JSON.parse(productosPorComprar);
    let total = 0;
    productosCompra.forEach((productoCompra, index) => {
      const productoEncontrado = productos.find(producto => producto.id === productoCompra.producto.id),
            porcionEncontrada = porciones.find(porcion => porcion.id === productoCompra.porcion.id),
            subtotal = porcionEncontrada.factorPrecio * productoEncontrado.precio * productoCompra.cantidad;

      const productoCompraFinal = {
        "id": index,
        "imagen": productoEncontrado.urlImagen,
        "nombre": productoEncontrado.nombre,
        "precio": productoEncontrado.precio,
        "porcion": porcionEncontrada.porcion,
        "cantidad": productoCompra.cantidad,
        "subtotal": subtotal
      }

      total += subtotal;
      renderTemplateTablaCarrito(productoCompraFinal);
    })
    $total.textContent = `$${total}`;
    const $tbody = $tabla.querySelector("tbody");
    $tbody.insertBefore($fragment, $tbody.firstChild);
  }
}

const renderTemplateTablaCarrito = (producto) => {
  $templateProductos.querySelector(".imagen").setAttribute("src", producto.imagen);
  $templateProductos.querySelector(".nombre").textContent = producto.nombre;
  $templateProductos.querySelector(".precio").textContent = `$${producto.precio}`;
  $templateProductos.querySelector(".porcion").textContent = producto.porcion;
  $templateProductos.querySelector(".cantidad").textContent = producto.cantidad;
  $templateProductos.querySelector(".subtotal").textContent = `$${producto.subtotal}`;
  $templateProductos.querySelector(".boton-borrar").dataset.id = producto.id;
  
  let $clon = document.importNode($templateProductos, true);
  $fragment.appendChild($clon);
}

// Evento click en botón comprar
$btnConfirmar.addEventListener("click", async (e) => {
  const listaProductosCompra = localStorage.getItem("compras");
  const sesion = localStorage.getItem("sesion");

  if(listaProductosCompra){
    if(!sesion){
      location.href = "./login.html";
      return
    }
    const idUsuario = JSON.parse(sesion).id;
    const nuevaCompra = JSON.stringify({
      "usuario": {"id": idUsuario},
      "productosCompra": JSON.parse(listaProductosCompra)
    });

    const respuesta = await api.crearCompra(nuevaCompra);
    if(respuesta.res.ok){
      localStorage.removeItem("compras");
      $telefono.textContent = JSON.parse(sesion).telefono;
      $backdrop.removeAttribute("hidden");
      compraConfirmada = {
        asunto: `Compra - ${sesionObject.nombre} ${sesionObject.apellido}`,
        remitente: sesionObject.correo,
        mensaje: `
        <body>
          <p>Gracias por interesarte en nuestros productos. Nos comunicaremos contigo al número <strong>${sesionObject.telefono}</strong></p>
          <strong>Recibimos tu mensaje:</strong>
          <p>Hola, deseo comprar los siguientes productos:</p>
          <table>${$tabla.innerHTML}</table>
          <br>
          <a href="www.tortones.com">www.tortones.com</a>
        </body>
        `
      }
      const respuesta = await api.enviarCotizacion(JSON.stringify(compraConfirmada));
      console.log(respuesta);
      
      let notificacionAdmin = {
        asunto: `Nueva compra - ${sesionObject.nombre} ${sesionObject.apellido}`,
        remitente: sesionObject.correo,
        mensaje: `
        <body>
          <p><strong>Cliente: </strong> ${sesionObject.nombre} ${sesionObject.apellido} - ${sesionObject.correo}</p>
          <br>
          <p><strong>Teléfono del cliente: </strong> ${sesionObject.telefono}</p>
          <br>
          <strong>Mensaje:</strong>
          <p>Hola, deseo comprar los siguientes productos:</p>
          <table>${$tabla.innerHTML}</table>
          <br>
          <a href="www.tortones.com">www.tortones.com</a>
        </body>
        `
      }

      const respuestaNotifAdmin = await api.notificarAdmin(JSON.stringify(notificacionAdmin));
      console.log(respuestaNotifAdmin);
    }
  } else{
    location.href = "./catalogoProductos.html";
  }
})

// Muestra los productos por comprar en una tabla
mostrarProductosCarrito();

//escuchar clic en los botones para gestionar la compra
document.addEventListener("click", async (e) => {
  //Cierra el mensaje de confirmación de compra
  if(e.target.matches(".aceptar")){
    $backdrop.setAttribute("hidden", null);
    location.reload();
  }

  //Inicia eliminación de un producto del carrito de compras
  if(e.target.matches(".boton-borrar")){
    $backdropEliminar.removeAttribute("hidden");
    $btnEliminar.dataset.id = e.target.dataset.id
    console.log();
  }

  //Confirma eliminación de un producto del carrito de compras
  if(e.target.matches(".eliminar")){
    const idABuscar = Number(e.target.dataset.id);
    if(productosPorComprar){
      const productosCompra = JSON.parse(productosPorComprar)
      const nuevaCompra = productosCompra.filter((producto, index) => {
        return index !== idABuscar;
      })
      const nuevaCompraString = JSON.stringify(nuevaCompra);
      localStorage.setItem("compras", nuevaCompraString);
      location.reload();
    }
    $backdropEliminar.setAttribute("hidden", null);
  }

  //Cancelar eliminación de un producto del carrito de compras
  if(e.target.matches(".cancelar")){
    $backdrop.setAttribute("hidden", null);
    $backdropEliminar.setAttribute("hidden", null);
  }
})