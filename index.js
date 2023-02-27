const scrollTo = document.getElementsByClassName("scrollTo");

Array.from(scrollTo).forEach(el => {
    el.addEventListener("click", function (e) {
      const target = e.currentTarget.getAttribute("target");
      const sectionObjetivo = document.getElementById(target);
      const position = sectionObjetivo.offsetTop - 100;
      window.scrollTo({
        top: position, behavior: "smooth"
      })
    })
  })