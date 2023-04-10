import { gestionarIngredientes } from "./tablaIngredientes.js";

const $headerTabla = document.querySelector(".header-tabla"),
$tablaProductos = document.querySelector(".tabla-productos"),
$tablaIngredientes = document.querySelector(".tabla-ingredientes"),
$tabs = document.getElementById("tabs"),
lastTab = localStorage.getItem("tab");

export let tabla;
let firstTime = true;

if(lastTab){
  tabla = lastTab;
}

// Escuchar cambio de pestaña (tab)
$tabs.addEventListener("change", function(e) {
    tabla = this.querySelector("input[name='tab']:checked").dataset.tab;
    localStorage.setItem("tab", tabla);
    cambiarTab();
  })

export const cambiarTab = () => {
    const tabProductos = document.getElementById("tabProductos");
    const tabIngredientes = document.getElementById("tabIngredientes");
    if(tabla === "productos"){
        tabProductos.setAttribute("checked", null);
        $tablaIngredientes.setAttribute("hidden", null);
        $tablaProductos.removeAttribute("hidden");
        $headerTabla.children[0].textContent = "Administrar productos";
        $headerTabla.children[1].textContent = "Agregar producto";
    }
  
    if(tabla === "ingredientes"){
        tabIngredientes.setAttribute("checked", null);
        $tablaProductos.setAttribute("hidden", null);
        $tablaIngredientes.removeAttribute("hidden");
        $headerTabla.children[0].textContent = "Administrar ingredientes";
        $headerTabla.children[1].textContent = "Agregar ingrediente";
  
        if(firstTime){
            gestionarIngredientes();
            firstTime = false;
        }
    }
    return;
  }