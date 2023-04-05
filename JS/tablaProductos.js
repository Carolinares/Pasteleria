const $templateAdminProductos = document.getElementById("template-admin-productos").content,
  $tablaProductos = document.querySelector(".tabla-productos"),
  $inputImg = document.getElementById("imagen-producto"),
  $img = document.getElementById("image-preview"),
  $formProducto = document.getElementById("form-productos"),
  $backdrop = document.querySelector(".backdrop"),
  $backdropEliminar = document.querySelector(".backdrop-eliminar"),
  $btnConfirmEliminar = document.querySelector(".confirmEliminar"),
  $fragmento = document.createDocumentFragment(),
  $tabs = document.getElementById("tabs");

let accionForm = "crear";
let tabla = "productos";

const traerProductos = async (uri) => {
  let headersList = {
    "Content-Type": "application/json",
    "acces-control-allow-origin": "*",
  };

  try {
    const res = await fetch(uri, {
        headers: headersList,
      }),
      data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

//Traer todos los productos
document.addEventListener("DOMContentLoaded", async () => {
  const productos = await traerProductos("http://localhost:8080/api/productos");
  productos.forEach((producto) => {
    $templateAdminProductos
      .querySelector(".imagen-template")
      .setAttribute("src", producto.urlImagen);
    $templateAdminProductos.querySelector(".nombre").textContent =
      producto.nombre;
    $templateAdminProductos.querySelector(".descripcion").textContent =
      producto.descripcion;
    $templateAdminProductos.querySelector(
      ".precio"
    ).textContent = `$${producto.precio}`;
    //dataset aributos de producto para acciones editar y borrar
    $templateAdminProductos.querySelector(".editar").dataset.id = producto.id;
    $templateAdminProductos.querySelector(".editar").dataset.imagen =
      producto.urlImagen;
    $templateAdminProductos.querySelector(".editar").dataset.nombre =
      producto.nombre;
    $templateAdminProductos.querySelector(".editar").dataset.descripcion =
      producto.descripcion;
    $templateAdminProductos.querySelector(".editar").dataset.precio =
      producto.precio;
    $templateAdminProductos.querySelector(".borrar").dataset.id = producto.id;

    const $clon = document.importNode($templateAdminProductos, true);
    $fragmento.appendChild($clon);
  });

  $tablaProductos.querySelector("tbody").appendChild($fragmento);
});

//Previsualizar imagen en formulario
$inputImg.addEventListener("change", function (e) {
  if (this.files && this.files[0]) {
    const imgUrl = URL.createObjectURL(this.files[0]);
    $img.setAttribute("src", imgUrl);
  }
});

//Escuchar envío de formulario productos
$formProducto.addEventListener("submit", async function (e) {
  let url = "";
  if ($inputImg.files[0]) {
    e.preventDefault();
    const imagen = new FormData();
    imagen.append("archivo", $inputImg.files[0]);
    //Cargar imagen
    const respuestaImg = await getionarProducto(
      "http://localhost:8080/api/archivos/cargar",
      imagen,
      "imagen"
    );
    url = respuestaImg.data.url;
  }

  const datosProducto = {
    nombre: this.nombre.value,
    descripcion: this.descripcion.value,
    precio: this.precio.value,
  };

  let respuestaProducto;

  //Agregar Producto
  if(accionForm === "crear"){
    if(!url) return;
    datosProducto.urlImagen = url;
    respuestaProducto = await getionarProducto(
      "http://localhost:8080/api/productos",
      JSON.stringify(datosProducto),
      accionForm
    );
  }

  //Editar Producto
  if(accionForm === "editar"){
    if(url){
      datosProducto.urlImagen = url;
    };
    respuestaProducto = await getionarProducto(
      `http://localhost:8080/api/productos/${this.idProduct.value}`,
      JSON.stringify(datosProducto),
      accionForm
    );
  }
  console.log(respuestaProducto);
  if (respuestaProducto.res.ok) {
    $backdrop.setAttribute("hidden", null);
    location.reload();
  }
});

//Fetch para gestionar producto
const getionarProducto = async (uri, datosProducto, accion) => {
  let headersList = {};
  if (accion === "imagen" || accion === "eliminar") {
    headersList = {
      "Accept": "*/*",
      "acces-control-allow-origin": "*",
    };
  } else {
    headersList = {
      "Content-Type": "application/json",
      "acces-control-allow-origin": "*",
    };
  }
 
  const requestOptions = {
    headers: headersList,
    body: datosProducto
  };
  
  if(accion === "imagen" || accion === "crear"){
    requestOptions.method = "POST"
  } else if(accion === "editar"){
    requestOptions.method = "PUT"
  }else if(accion === "eliminar"){
    requestOptions.method = "DELETE";
    delete requestOptions.body;
  }

  try {
    const res = await fetch(uri, requestOptions),
      data = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    return { data, res };
  } catch (error) {
    console.log(error);
    let message = error.statusText || "Ocurrio un error";
    console.log(message);
  }
};

//escuchar clic en los botones editar, agregar y eliminar producto
document.addEventListener("click", async (e) => {
  if (e.target.matches(".agregar")) {
    accionForm = "crear";
    $backdrop.removeAttribute("hidden");
    $backdrop.querySelector(".aceptar").removeAttribute("hidden");
    $backdrop.querySelector(".actualizar").setAttribute("hidden", null);
    $backdrop.querySelector(".titulo").textContent = "Agregar producto";
  }

  if (e.target.matches(".cancelar")) {
    $backdrop.setAttribute("hidden", null);
    $backdropEliminar.setAttribute("hidden", null);
  }

  if (e.target.matches(".editar")) {
    accionForm = "editar";
    const producto = e.target.dataset;
    $backdrop.removeAttribute("hidden");
    $backdrop.querySelector(".actualizar").removeAttribute("hidden");
    $backdrop.querySelector(".aceptar").setAttribute("hidden", null);
    $backdrop.querySelector(".titulo").textContent = "Editar producto";
    $inputImg.removeAttribute("required");
    $formProducto.nombre.value = producto.nombre;
    $img.setAttribute("src", producto.imagen);
    $formProducto.descripcion.value = producto.descripcion;
    $formProducto.precio.value = producto.precio;
    $formProducto.idProduct.value = producto.id;
  }

  if(e.target.matches(".borrar")){
    accionForm = "eliminar";
    $backdropEliminar.removeAttribute("hidden");
    $btnConfirmEliminar.dataset.id = e.target.dataset.id;
  }

  if(e.target.matches(".confirmEliminar")){
    const respuestaEliminar = await getionarProducto(`http://localhost:8080/api/productos/${e.target.dataset.id}`, null, accionForm);
    location.reload();
  }
});
