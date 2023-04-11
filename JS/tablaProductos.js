import { cambiarTab, tabla } from "./administrador.js";
import * as api from "../services/api.service.js";

const $templateAdminProductos = document.getElementById("template-admin-productos").content,
  $tablaProductos = document.querySelector(".tabla-productos"),
  $inputImg = document.getElementById("imagen-producto"),
  $img = document.getElementById("image-preview"),
  $formProducto = document.getElementById("form-productos"),
  $backdropProductos = document.getElementById("backdrop-productos"),
  $backdropIngredientes = document.getElementById("backdrop-ingredientes"),
  $backdropEliminar = document.querySelector(".backdrop-eliminar"),
  $btnConfirmEliminar = document.querySelector(".confirmEliminar"),
  $fragmento = document.createDocumentFragment();

let accionForm = "crear";

//Traer todos los productos
document.addEventListener("DOMContentLoaded", async () => {
  const respuesta = await api.getAllProductos();
  if(!respuesta.res.ok)return;
  const productos = respuesta.data;
  productos.forEach((producto) => {
    $templateAdminProductos
      .querySelector(".imagen-template")
      .setAttribute("src", producto.urlImagen);
    $templateAdminProductos.querySelector(".nombre").textContent = producto.nombre;
    $templateAdminProductos.querySelector(".descripcion").textContent = producto.descripcion;
    $templateAdminProductos.querySelector(".precio").textContent = `$${producto.precio}`;
    //dataset aributos de producto para acciones editar y borrar
    $templateAdminProductos.querySelector(".editar").dataset.id = producto.id;
    $templateAdminProductos.querySelector(".editar").dataset.imagen = producto.urlImagen;
    $templateAdminProductos.querySelector(".editar").dataset.nombre = producto.nombre;
    $templateAdminProductos.querySelector(".editar").dataset.descripcion = producto.descripcion;
    $templateAdminProductos.querySelector(".editar").dataset.precio = producto.precio;
    $templateAdminProductos.querySelector(".borrar").dataset.id = producto.id;

    const $clon = document.importNode($templateAdminProductos, true);
    $fragmento.appendChild($clon);
  });

  $tablaProductos.querySelector("tbody").appendChild($fragmento);
  cambiarTab();
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
    const respuestaImg = await api.crearArchivo(imagen);
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
    respuestaProducto = await api.crearProducto(
      JSON.stringify(datosProducto)
    );
  }

  //Editar Producto
  if(accionForm === "editar"){
    if(url){
      datosProducto.urlImagen = url;
    };
    respuestaProducto = await api.editarProducto(this.idProduct.value,
      JSON.stringify(datosProducto),
    );
  }

  if (respuestaProducto.res.ok) {
    $backdropProductos.setAttribute("hidden", null);
    location.reload();
  }
});

//escuchar clic en los botones editar, agregar y eliminar producto
document.addEventListener("click", async (e) => {
  if (e.target.matches(".agregar") && tabla === "productos") {
    $img.setAttribute("src", "./assets/img/default.png");
    $formProducto.reset();
    accionForm = "crear";
    $backdropProductos.removeAttribute("hidden");
    $backdropProductos.querySelector(".aceptar").removeAttribute("hidden");
    $backdropProductos.querySelector(".actualizar").setAttribute("hidden", null);
    $backdropProductos.querySelector(".titulo").textContent = "Agregar producto";
  }

  if (e.target.matches(".cancelar") && tabla === "productos") {
    $backdropProductos.setAttribute("hidden", null);
    $backdropEliminar.setAttribute("hidden", null);
  }

  if (e.target.matches(".editar") && tabla === "productos") {
    console.log(tabla);
    accionForm = "editar";
    const producto = e.target.dataset;
    $backdropIngredientes.setAttribute("hidden", null);
    $backdropProductos.removeAttribute("hidden");
    $backdropProductos.querySelector(".actualizar").removeAttribute("hidden");
    $backdropProductos.querySelector(".aceptar").setAttribute("hidden", null);
    $backdropProductos.querySelector(".titulo").textContent = "Editar producto";
    $inputImg.removeAttribute("required");
    $formProducto.nombre.value = producto.nombre;
    $img.setAttribute("src", producto.imagen);
    $formProducto.descripcion.value = producto.descripcion;
    $formProducto.precio.value = producto.precio;
    $formProducto.idProduct.value = producto.id;
  }

  if(e.target.matches(".borrar") && tabla === "productos"){
    accionForm = "eliminar";
    $backdropEliminar.removeAttribute("hidden");
    $backdropEliminar.querySelector("h2").textContent = "Eliminar producto";
    $backdropEliminar.querySelector("p").textContent = "¿Confirma que desea eliminar este producto?";
    $btnConfirmEliminar.dataset.id = e.target.dataset.id;
  }

  if(e.target.matches(".confirmEliminar")){
    const respuestaEliminar = await api.eliminarProducto(e.target.dataset.id);
    location.reload();
  }
});