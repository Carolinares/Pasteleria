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
        
        // Retrieve existing data from localStorage
        const existingData = JSON.parse(localStorage.getItem('formData') || '[]');
        
        // Add new form data to the existing data array
        existingData.push(serializedData);
        
        // Store the updated data back to localStorage
        localStorage.setItem('formData', JSON.stringify(existingData));
      }

      form.classList.add('was-validated'); 
    }, false);
  });
})();
