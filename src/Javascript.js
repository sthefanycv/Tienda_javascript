document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slidesToShowDesktop = 4; // Mostrar 4 slides en desktop
    const slidesToShowTablet = 2; // Mostrar 2 slides en tablet
    const slidesToShowMobile = 1; // Mostrar 1 slide en mobile
  
    let currentIndex = 0;
  
    function getSlidesToShow() {
      // Determinar cuántos slides mostrar basado en el ancho de la pantalla
      if (window.innerWidth >= 1024) { // desktop
        return slidesToShowDesktop;
      } else if (window.innerWidth >= 640) { // tablet
        return slidesToShowTablet;
      } else { // mobile
        return slidesToShowMobile;
      }
    }
  
    function showSlides(index) {
      slides.forEach((slide, i) => {
        if (i >= index && i < index + getSlidesToShow()) {
          slide.style.display = 'inline-block'; // Mostrar en línea para desktop
        } else {
          slide.style.display = 'none';
        }
      });
    }
  
    function nextSlides() {
      currentIndex = (currentIndex + getSlidesToShow()) % slides.length;
      showSlides(currentIndex);
    }
  
    function prevSlides() {
      currentIndex = (currentIndex - getSlidesToShow() + slides.length) % slides.length;
      showSlides(currentIndex);
    }
  
    // Mostrar los primeros slides al cargar
    showSlides(currentIndex);
  
    // Escuchar cambios en el tamaño de la pantalla
    window.addEventListener('resize', function() {
      // Asegurar que siempre se muestre el número correcto de slides al cambiar el tamaño de la pantalla
      showSlides(currentIndex);
    });
  
    // Escuchar clics en las flechas de navegación
    nextBtn.addEventListener('click', nextSlides);
    prevBtn.addEventListener('click', prevSlides);
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