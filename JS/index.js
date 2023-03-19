const $scroll = document.getElementsByClassName("scrollTo"),
  $btnLogin = document.querySelector(".login-btn"),
  $btnRegistro = document.querySelector(".register-btn")
  $navContainer = document.querySelector(".container-fluid"),
  $ulNavBar = document.querySelector(".navbar-nav"),
  $images = document.getElementById("images"),
  $slider = document.querySelector(".slider");

let leftSlider = 0,
  currentImageSlider = 0,
  breakpoint = window.matchMedia("(max-width: 991px)");

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

  const responsive = (e) => {
    if (e.matches) {
      $navContainer.removeChild($btnLogin);
      $ulNavBar.append($btnLogin)
    } else {
      $ulNavBar.removeChild($btnLogin);
      $navContainer.appendChild($btnLogin);
    }    
  }
  breakpoint.addEventListener("change", responsive);
  responsive(breakpoint);
})

window.addEventListener("resize", (e) => {
  for (i = 0; i < $images.childElementCount; i++) {
    $images.children[i].style.width = `${window.innerWidth}px`;
  }
  leftSlider = window.innerWidth * currentImageSlider;
  $images.style.left = `-${leftSlider}px`;
})
document.addEventListener("click", function (e) {
  if (e.target.matches("#arrowLeft") && $images.offsetLeft < 0) {
    //Restar a left
    leftSlider -= window.innerWidth;
    $images.style.left = `-${leftSlider}px`;
    currentImageSlider = leftSlider / window.innerWidth;
  }

  if (e.target.matches("#arrowRight") && (window.innerWidth * ($images.childElementCount - 1)) != -$images.offsetLeft) {
    leftSlider += window.innerWidth;
    $images.style.left = `-${leftSlider}px`;
    currentImageSlider = leftSlider / window.innerWidth;
  }
})