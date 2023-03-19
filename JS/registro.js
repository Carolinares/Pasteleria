(function() {
    const forms = document.querySelectorAll('.requires-validation');
    Array.from(forms).forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) { 
          event.preventDefault(); 
          event.stopPropagation(); 
        } else {
          
          const formData = new FormData(form);
          const serializedData = JSON.stringify(Object.fromEntries(formData.entries())); 
          localStorage.setItem('formData', serializedData);
        }
  
        form.classList.add('was-validated'); 
      }, false);
    });
  })();