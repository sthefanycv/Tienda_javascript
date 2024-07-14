document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      const nameRegex = /^[a-zA-Z\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10,15}$/;

      if (!nameRegex.test(name)) {
          alert('Por favor, ingrese un nombre válido.');
          return;
      }

      if (!emailRegex.test(email)) {
          alert('Por favor, ingrese un correo electrónico válido.');
          return;
      }

      if (!phoneRegex.test(phone)) {
          alert('Por favor, ingrese un número de teléfono válido.');
          return;
      }

      if (message.length < 10) {
          alert('El mensaje debe tener al menos 10 caracteres.');
          return;
      }

      alert('Formulario enviado correctamente.');

      // Aquí puedes agregar la lógica para enviar el formulario
  });
});





document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login');

    // Función para verificar si hay sesión iniciada
    function checkSession() {
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (isLoggedIn === 'true') {
        // Usuario tiene sesión iniciada, redirigir a perfil.html
        loginButton.href = '/src/views/perfil.html';
      } else {
        // Usuario no tiene sesión iniciada, redirigir a login.html
        loginButton.href = '/src/views/login.html';
      }
    }

    // Llamar a la función al cargar la página para establecer el enlace inicial
    checkSession();
  });

