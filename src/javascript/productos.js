document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('#carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    let itemsToShow = 1;
    let carouselItems = [];

    // Función para cargar productos
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        carousel.innerHTML = '';

products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('carousel-item', 'border', 'mr-5', 'rounded', 'shadow', 'w-full');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-50 object-cover">
        <h2 class="text-lg font-bold mt-2 ml-4">${product.name}</h2>
        <p class="text-gray-600 ml-4">$${product.price}</p>
        <p class="text-gray-600 ml-4">${product.status}</p>
        <a href="producto.html?id=${product.id}" class="ml-4 mb-4 bg-gray-200 text-[#272727] rounded-md hover:bg-gray-300 font-bold mt-4 inline-block py-2 px-4">Comprar</a>
    `;
    carousel.appendChild(productElement);
});


        carouselItems = document.querySelectorAll('.carousel-item');
        updateCarousel();
    }

    function updateCarousel() {
        const totalItems = carouselItems.length;
        const itemWidth = carouselItems[0].clientWidth;
        const offset = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    function handleResize() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            itemsToShow = 3;
        } else if (screenWidth >= 640) {
            itemsToShow = 2;
        } else {
            itemsToShow = 1;
        }
        updateCarousel();
    }

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carouselItems.length - itemsToShow;
        }
        updateCarousel();
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < carouselItems.length - itemsToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    // Inicializa y actualiza el carrusel
    loadProducts();
    handleResize();

    // Ajuste responsivo
    window.addEventListener('resize', handleResize);
});






//CARRUSEL

const displayCarouselProducts = () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const carouselContainer = document.getElementById('carousel');
    carouselContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('carousel-item', 'border', 'rounded-md', 'shadow' , 'gap-20');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-50 object-cover rounded-t-md">
            <h2 class="text-lg font-bold mt-2">${product.name}</h2>
            <p class="text-gray-600">$${product.price}</p>
            <p class="text-gray-600">${product.status}</p>
            <button class="mb-10 ml-4 bg-[#272727] hover:bg-gray-400 text-gray-300 font-bold py-2 px-4 rounded-md">Comprar</button>
        `;
        carouselContainer.appendChild(productElement);
    });
};

//BOTON

document.addEventListener('DOMContentLoaded', function() {
    const adminButtonContainer = document.getElementById('adminButtonContainer');
    
    // Verificar si hay sesión iniciada y obtener el rol
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const rol = localStorage.getItem('rol');
    
    // Lógica para mostrar u ocultar el botón según el rol y la sesión
    if (isLoggedIn === 'true' && rol === 'Admin') {
        adminButtonContainer.style.display = 'block';  // Mostrar el contenedor del botón
    } else {
        adminButtonContainer.style.display = 'none';   // Ocultar el contenedor del botón
    }
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