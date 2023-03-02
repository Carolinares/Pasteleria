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

  function validateForm() {
    // Get the input fields
    const name = document.getElementById("form-nombre").value;
    const email = document.getElementById("form-correo").value;
    const telefono = document.getElementById("form-telefono").value;

    // Check if the name field is empty
    // Check if the name field is empty
    if (name == "") {
      alert("Name must be filled out");
      return false;
    }

    // Check if the name field contains only letters and spaces
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      alert("Name can only contain letters and spaces");
      return false;
    }

    // Check if the name field is between 2 and 50 characters long
    if (name.length < 2 || name.length > 50) {
      alert("Name must be between 2 and 50 characters long");
      return false;
    }


    // Check if the email field is empty and is a valid email address
    if (email == "" || !isValidEmail(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    // Check if the message field is empty
    if (telefono == "") {
      alert("Please enter a message");
      return false;
    }

    // Helper function to validate email addresses using a regular expression
    function isValidEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
        }

    // If all the fields are valid, allow the form to be submitted
    return true;
  }

  