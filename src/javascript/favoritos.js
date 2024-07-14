document.addEventListener("DOMContentLoaded", function () {
    // Función para obtener y parsear los productos favoritos desde localStorage
    function getFavoriteProducts() {
        return JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    }

    // Obtener el contenedor donde se mostrarán los productos favoritos
    const favoriteProductsContainer = document.getElementById("favoriteProducts");
    const notLoggedInMessage = document.getElementById("notLoggedInMessage");

    // Función para mostrar los productos favoritos
    function renderFavoriteProducts() {
        // Limpiar el contenido previo del contenedor
        favoriteProductsContainer.innerHTML = "";

        // Obtener los productos favoritos actuales
        const favoriteProducts = getFavoriteProducts();

        // Verificar si hay productos favoritos
        if (favoriteProducts.length === 0) {
            // Mostrar mensaje de no hay favoritos si el array está vacío
            favoriteProductsContainer.innerHTML = "<p>No hay productos favoritos guardados.</p>";
        } else {
            // Recorrer los productos favoritos y crear el HTML para cada uno
            favoriteProducts.forEach((product) => {
                const productCard = document.createElement("div");
                productCard.classList.add("border", "rounded-md", "shadow-md", "p-4");

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="w-full rounded-md mb-4">
                    <h2 class="text-xl font-bold mb-2">${product.name}</h2>
                    <p class="text-gray-600 mb-4">$${product.price}</p>
                    <button class="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-900" data-id="${product.id}">Ver Detalles</button>
                    <button class="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 ml-2" data-id="${product.id}">Quitar de Favoritos</button>
                `;

                // Agregar evento click para ver detalles del producto
                const detailsButton = productCard.querySelector("button[data-id]");
                detailsButton.addEventListener("click", function () {
                    const productId = parseInt(this.getAttribute("data-id"));
                    window.location.href = `/src/views/producto.html?id=${productId}`;
                });

                // Agregar evento click para quitar de favoritos
                const removeFromFavoritesButton = productCard.querySelector("button.bg-red-600");
                removeFromFavoritesButton.addEventListener("click", function () {
                    const productId = parseInt(this.getAttribute("data-id"));

                    // Filtrar los productos y actualizar localStorage
                    const updatedFavorites = favoriteProducts.filter(product => product.id !== productId);
                    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));

                    // Volver a renderizar la lista de productos favoritos
                    renderFavoriteProducts();
                });

                // Agregar el producto al contenedor principal
                favoriteProductsContainer.appendChild(productCard);
            });
        }
    }

    // Función para verificar si hay sesión iniciada
    function checkSession() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
            // Usuario tiene sesión iniciada, mostrar favoritos
            renderFavoriteProducts();
            // Ocultar mensaje de no iniciado sesión
            notLoggedInMessage.classList.add('hidden');
        } else {
            // Usuario no tiene sesión iniciada, mostrar mensaje para iniciar sesión
            notLoggedInMessage.classList.remove('hidden');
        }
    }

    // Llamar a la función al cargar la página para establecer el estado inicial
    checkSession();
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

  