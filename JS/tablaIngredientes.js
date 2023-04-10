import * as api from "../services/api.service.js";
import { tabla } from "./administrador.js";

const $templateAdminIngredientes = document.getElementById("template-admin-ingredientes").content,
  $formIngredientes = document.getElementById("form-ingredientes"),
  $tablaIngredientes = document.querySelector(".tabla-ingredientes"),
  $backdropIngredientes = document.getElementById("backdrop-ingredientes"),
  $backdropProductos = document.getElementById("backdrop-productos"),
  $backdropEliminar = document.querySelector(".backdrop-eliminar"),
  $btnConfirmEliminar = document.querySelector(".confirmEliminar"),
  $fragmento = document.createDocumentFragment();

let accionForm = "crear";

export const gestionarIngredientes = async () => {
    //Traer todos los productos
    const respuestaCategorias = await api.getAllCategoriasIngredientes();
    if(!respuestaCategorias.res.ok)return;
    const categorias = respuestaCategorias.data;

    
    categorias.forEach((categoria) => {
      //Asignación de categorias desde formulario
      $formIngredientes.categoriaIngrediente.innerHTML += `
        <option value="${categoria.id}">${categoria.nombre}</option>
      `
      const ingredientes = categoria.ingrediente;
        ingredientes.forEach((ingrediente) => {
          $templateAdminIngredientes.querySelector(".nombre").textContent = ingrediente.nombre;
          $templateAdminIngredientes.querySelector(".descripcion").textContent = ingrediente.descripcion;
          $templateAdminIngredientes.querySelector(".categoria").textContent = categoria.nombre;
  
          //dataset aributos de ingrediente para acciones editar y borrar
          $templateAdminIngredientes.querySelector(".editar").dataset.id = ingrediente.id;
          $templateAdminIngredientes.querySelector(".editar").dataset.nombre = ingrediente.nombre;
          $templateAdminIngredientes.querySelector(".editar").dataset.descripcion = ingrediente.descripcion;
          $templateAdminIngredientes.querySelector(".editar").dataset.color = ingrediente.color;
          $templateAdminIngredientes.querySelector(".editar").dataset.categoriaId = categoria.id;
          $templateAdminIngredientes.querySelector(".borrar").dataset.id = ingrediente.id;
      
          const $clon = document.importNode($templateAdminIngredientes, true);
          const divColor = document.createElement("div");
          divColor.classList.add("color-ingrediente");
          divColor.style.backgroundColor = `${ingrediente.color}`;
          $clon.querySelector(".color").appendChild(divColor);
  
          $fragmento.appendChild($clon);
        })
    });

    $tablaIngredientes.querySelector("tbody").appendChild($fragmento);
}

//Escuchar envío de formulario ingredientes
$formIngredientes.addEventListener("submit", async function (e) {
    const datosIngrediente = {
      nombre: this.nombreIngrediente.value,
      descripcion: this.descripcionIngrediente.value,
      color: this.colorIngrediente.value,
      categoriaIngrediente: { id: this.categoriaIngrediente.value }
    };
  
    let respuestaIngrediente;
  
    //Agregar Ingrediente
    if(accionForm === "crear"){
        respuestaIngrediente = await api.crearIngrediente(
          JSON.stringify(datosIngrediente)
        );
    }
  
    //Editar Ingrediente
    if(accionForm === "editar"){
      respuestaIngrediente = await api.editarIngrediente(this.idIngrediente.value,
        JSON.stringify(datosIngrediente)
      );
    }

    if (respuestaIngrediente.res.ok) {
      $backdropIngredientes.setAttribute("hidden", null);
      location.reload();
    }
  });
  

//escuchar clic en los botones editar, agregar y eliminar ingrediente
document.addEventListener("click", async (e) => {
    if (e.target.matches(".agregar") && tabla === "ingredientes") {
      $formIngredientes.reset();
      accionForm = "crear";
      $backdropIngredientes.removeAttribute("hidden");
      $backdropIngredientes.querySelector(".aceptar").removeAttribute("hidden");
      $backdropIngredientes.querySelector(".actualizar").setAttribute("hidden", null);
      $backdropIngredientes.querySelector(".titulo").textContent = "Agregar ingrediente";
    }
  
    if (e.target.matches(".cancelar") && tabla === "ingredientes") {
      $backdropIngredientes.setAttribute("hidden", null);
      $backdropEliminar.setAttribute("hidden", null);
    }
  
    if (e.target.matches(".editar") && tabla === "ingredientes") {
        console.log(tabla);
        accionForm = "editar";
        const ingrediente = e.target.dataset;
        console.log(ingrediente);
        $backdropProductos.setAttribute("hidden", null);
        $backdropIngredientes.removeAttribute("hidden");
        $backdropIngredientes.querySelector(".actualizar").removeAttribute("hidden");
        $backdropIngredientes.querySelector(".aceptar").setAttribute("hidden", null);
        $backdropIngredientes.querySelector(".titulo").textContent = "Editar ingrediente";
        $formIngredientes.nombreIngrediente.value = ingrediente.nombre;
        $formIngredientes.descripcionIngrediente.value = ingrediente.descripcion;
        $formIngredientes.colorIngrediente.value = ingrediente.color;
        $formIngredientes.idIngrediente.value = ingrediente.id;
        $formIngredientes.categoriaIngrediente.value = ingrediente.categoriaId;
    }
  
    if(e.target.matches(".borrar") && tabla === "ingredientes"){
      accionForm = "eliminar";
      $backdropEliminar.removeAttribute("hidden");
      $backdropEliminar.querySelector("h2").textContent = "Eliminar ingrediente";
      $backdropEliminar.querySelector("p").textContent = "¿Confirma que desea eliminar este ingrediente?";
      $btnConfirmEliminar.dataset.id = e.target.dataset.id;
    }
  
    if(e.target.matches(".confirmEliminar")){
      const respuestaEliminar = await api.eliminarIngrediente(e.target.dataset.id);
      location.reload();
    }
  });