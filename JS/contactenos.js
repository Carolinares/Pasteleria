const scrollTo = document.getElementsByClassName("scrollTo");
const $form = document.querySelector(".contacto__form"),
 $allInput = document.querySelectorAll(".contacto__form [required]");

 $allInput.forEach((input) => {
    const $span = document.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contacto__form-error", "none");
    input.insertAdjacentElement("afterend", $span);
 });

 document.addEventListener("keyup", (e) => {
  if(e.target.matches(".contacto__form [required]")){
    let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? document.getElementById($input.name).classList.add("is-active")
            : document.getElementById($input.name).classList.remove("is-active");
        }

        if (!pattern) {
          return $input.value === ""
            ? document.getElementById($input.name).classList.add("is-active")
            : document.getElementById($input.name).classList.remove("is-active");
        }
  } 
 });

(function(){
  ("#NavBar").load("../navbar.html");
});


  