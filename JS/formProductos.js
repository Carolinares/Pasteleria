function validarFormulario() {
  var nombre = document.getElementById("nombre").value;
  var imagen = document.getElementById("imagen").value;
  var descripcion = document.getElementById("descripcion").value;
  var porciones = document.getElementById("porciones").value;
  var precio = document.getElementById("precio").value;

  if (nombre == "") {
    alert("Por favor ingresa un nombre válido");
    return false;
  }

  if (descripcion == "") {
    alert("Por favor ingresa una descripción válida");
    return false;
  }

  if (porciones == "" || porciones <= 0) {
    alert("Por favor ingresa una cantidad de porciones válida");
    return false;
  }

  if (precio == "" || precio <= 0) {
    alert("Por favor ingresa un precio válido");
    return false;
  }

  return true;
}
