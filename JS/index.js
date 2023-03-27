const $scroll = document.getElementsByClassName("scrollTo"),  
  $btnRegistro = document.querySelector(".register-btn"),  
  $images = document.getElementById("images"),
  sesion = localStorage.getItem("sesion"),
  $slider = document.querySelector(".slider");

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
  if(window.location.pathname === "/Pasteleria/index.html"){
  window.addEventListener("resize", (e) => {
    
    for (i = 0; i < $images.childElementCount; i++) {
      $images.children[i].style.width = `${window.innerWidth}px`;
    }
    leftSlider = window.innerWidth * currentImageSlider;
    $images.style.left = `-${leftSlider}px`;
  })
  
  document.addEventListener("click", function (e) { 
    let lastImage = $images.childElementCount - 1;
    
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
    
  })
}}

const menuUser = () => {
  const $user = document.getElementById("user"),
    $login = document.querySelector(".login-btn"),
    $action = document.getElementById("action"),
    $userMenu = $user.querySelector(".user-menu"),
    $username = document.getElementById("name");
  if(sesion){
    const user = JSON.parse(sesion);
    $username.textContent = user.name;
    $user.classList.remove("hidden");
    $login.classList.add("hidden");

    $user.addEventListener("click", (e) => {
      if(e.target.matches(".button")){
        localStorage.removeItem("sesion");
        window.location.href = "./login.html";
      } else if(e.target.matches("#action")){
        const locat = (user.rol === "admin") ? "./tablaProductos.html" : "./index.html";
        window.location.href = locat;
      } else {
        $userMenu.classList.toggle("hidden");
      }      
    })
    
    if(user.rol === "admin"){
      $action.classList.remove("fa-cart-shopping");
      $action.classList.add("fa-gear");
    } else{
      $action.classList.add("fa-cart-shopping");
      $action.classList.remove("fa-gear");
    }
  } else {
    $user.classList.add("hidden");
    $login.classList.remove("hidden");
  }  
}

//<a href="./registro.html">Registrar usuario</a>
const registrarUsuario = () => {
  const $buttonLogout = document.getElementById("logout");
  const user = JSON.parse(sesion);
  if(!sesion) return;
  
  if(user.rol === "admin"){
    const $register = document.createElement("a");
    $register.setAttribute("href", "./registro.html");
    $register.textContent = "Registrar usuario";
    $buttonLogout.insertAdjacentElement("beforebegin", $register);
  }
}
registrarUsuario();