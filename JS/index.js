const $scroll = document.getElementsByClassName("scrollTo"),  
  $btnRegistro = document.querySelector(".register-btn"),  
  $images = document.getElementById("images"),
  sesion = localStorage.getItem("sesion"),
  $slider = document.querySelector(".slider"),
  $carrito = document.querySelector(".carrito"),
  $carritoCantidad = document.getElementById("carrito-cantidad");

let productosPorComprar = localStorage.getItem("compras");

  let leftSlider = 0,
  currentImageSlider = 0;

Array.from($scroll).forEach(el => {
  el.addEventListener("click", function (e) {
    const target = e.currentTarget.getAttribute("target");
    const $sectionObjetivo = document.getElementById(target);
    const position = $sectionObjetivo.offsetTop - 70;
    window.scrollTo({
      top: position, behavior: "smooth"
    })
  })
})

document.addEventListener("DOMContentLoaded", (e) => {
  responsive();
  sliderIndex();
  menuUser();
})

const responsive = () => {
  const $sesionStatus = document.querySelector(".sesion-status"),
  $navContainer = document.querySelector(".container-fluid"),
  $ulNavBar = document.querySelector(".navbar-nav"),
  breakpoint = window.matchMedia("(max-width: 991px)");
  
  const responsiveNav = () => {
    if (breakpoint.matches && $navContainer.contains($sesionStatus)) {
      $navContainer.removeChild($sesionStatus);
      $ulNavBar.append($sesionStatus)
    } else if($ulNavBar.contains($sesionStatus)) {
      $ulNavBar.removeChild($sesionStatus);
      $navContainer.appendChild($sesionStatus);
    }
  }
  responsiveNav();
  breakpoint.addEventListener("change", responsiveNav);
}


const sliderIndex = () => {
  if(window.location.pathname.includes("index.html")){
    window.addEventListener("resize", (e) => {
      
      for (i = 0; i < $images.childElementCount; i++) {
        $images.children[i].style.width = `${window.innerWidth}px`;
      }
      leftSlider = window.innerWidth * currentImageSlider;
      $images.style.left = `-${leftSlider}px`;
    })
  
    document.addEventListener("click", (e) => { 
      let lastImage = $images.childElementCount - 1;
      
      //Slider home
      if (e.target.matches("#arrowLeft") && $images.offsetLeft < 0) {
        //Restar a left
        leftSlider -= window.innerWidth;
        $images.style.left = `-${leftSlider}px`;
        currentImageSlider = leftSlider / window.innerWidth;
      }
    
      if (e.target.matches("#arrowRight") && (window.innerWidth * lastImage) != -$images.offsetLeft) {
        leftSlider += window.innerWidth;
        $images.style.left = `-${leftSlider}px`;
        currentImageSlider = leftSlider / window.innerWidth;
      }
      
      if (currentImageSlider > 0){
        $slider.nextElementSibling.children[0].classList.remove("arrow-hidden");
      }else{
        $slider.nextElementSibling.children[0].classList.add("arrow-hidden");
      }
      
      if (currentImageSlider === lastImage){
        $slider.nextElementSibling.children[1].classList.add("arrow-hidden");
      }else{
        $slider.nextElementSibling.children[1].classList.remove("arrow-hidden");
      }

      //Ir a página carrito compras
      if(e.target.matches(".cart")){
        window.location.href = "./carroCompras.html"
      }
    })
  }
}

const menuUser = () => {
  const $user = document.getElementById("user"),
    $login = document.querySelector(".login-btn"),
    $action = document.getElementById("action"),
    $userMenu = $user.querySelector(".user-menu"),
    $username = document.getElementById("name");
  if(sesion){
    const user = JSON.parse(sesion);
    $username.textContent = `${user.nombre} ${user.apellido}`;
    $user.classList.remove("hidden");
    $login.classList.add("hidden");

    $user.addEventListener("click", (e) => {
      if(e.target.matches(".button")){
        localStorage.removeItem("sesion");
        localStorage.removeItem("compras");
        window.location.href = "./login.html";
      } else if(e.target.matches("#action")){
        window.location.href = "./administrador.html";
      } else {
        $userMenu.classList.toggle("hidden");
      }      
    })
    
    if(user.rol === "Administrador"){
      $action.removeAttribute("hidden");
      $carrito.setAttribute("hidden", null);
    } else {
      $action.setAttribute("hidden", null);
    }
  } else {
    $user.classList.add("hidden");
    $login.classList.remove("hidden");
  }  
}

const registrarUsuario = () => {
  const $buttonLogout = document.getElementById("logout");
  const user = JSON.parse(sesion);
  if(!sesion) return;
  
  if(user.rol === "Administrador"){
    const $register = document.createElement("a");
    $register.setAttribute("href", "./registro.html");
    $register.textContent = "Registrar usuario";
    $buttonLogout.insertAdjacentElement("beforebegin", $register);
  }
}
registrarUsuario();

//Muestra la cantidad de productos en el carrito 
if(productosPorComprar){
  $carritoCantidad.removeAttribute("hidden");
  let listaProductos = JSON.parse(productosPorComprar);
  let cantidadTotal = 0;
  listaProductos.forEach((producto) => {
    cantidadTotal += producto.cantidad
  })
  $carritoCantidad.textContent = cantidadTotal;
}