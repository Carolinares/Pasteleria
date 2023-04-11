const inputFile = document.getElementById('input-file');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imgElement = document.getElementById('img');
const deleteBtn = document.getElementById('delete-btn');

canvas.style.display = 'block';
canvas.style.margin = '0 auto';


inputFile.addEventListener('change', function() {
  const file = inputFile.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function() {
    const img = new Image();
    img.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 4, 0, Math.PI * 2);    
      ctx.closePath();
      ctx.clip();
      // Asegurarse de que la imagen no se dibuje más grande que el círculo
      const aspectRatio = img.height / img.width;
      const imgWidth = canvas.width / 2;
      const imgHeight = imgWidth * aspectRatio;
      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2;
      ctx.drawImage(img, x, y, imgWidth, imgHeight);        
      ctx.restore();

      imgElement.src = reader.result;
      canvas.style.display = 'none';
      imgElement.style.display = 'block';

      // Mostrar el botón de eliminar
      deleteBtn.style.display = 'block';
    };
    img.src = reader.result;
  };
});

deleteBtn.addEventListener('click', function() {
    imgElement.src = '';
    canvas.style.display = 'block';
    imgElement.style.display = 'none';
    deleteBtn.style.display = 'none';
    inputFile.value = '';
  })





