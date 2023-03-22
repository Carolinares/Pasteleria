const $scroll = document.getElementsByClassName("scrollTo"),  
  $btnRegistro = document.querySelector(".register-btn");  
  $images = document.getElementById("images"),
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
  const $btnLogin = document.querySelector(".login-btn"),
    $navContainer = document.querySelector(".container-fluid"),
    $ulNavBar = document.querySelector(".navbar-nav");

  let breakpoint = window.matchMedia("(max-width: 991px)");

  const responsive = (e) => {
    if (e.matches) {
      $navContainer.removeChild($btnLogin);
      $ulNavBar.append($btnLogin)
    } else if($ulNavBar.contains($btnLogin)) {
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