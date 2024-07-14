document.addEventListener("DOMContentLoaded", function () {
    const productDetails = document.getElementById("productDetails");

    // Obtener el id del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Recuperar productos desde localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Lógica para cargar y mostrar los detalles del producto
    const product = products.find((product) => product.id === parseInt(productId));

    if (product) {
        const productElement = document.createElement("div");
        productElement.classList.add("border", "rounded-md", "shadow", "p-4", "flex", "flex-col", "items-center");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-[800px] object-cover rounded-md mt-10">
            <h2 class="text-4xl font-bold mt-10 text-center">${product.name}</h2>
            <p class="text-gray-600 text-center text-3xl font-medium m-4">$${product.price}</p>
            <p class="bg-[#272727] text-white rounded-md text-center font-medium p-2">${product.status}</p>
            <p class="text-gray-800 mt-4 text-center text-2xl lg:px-40 mb-5">${product.description}</p>
            <div class="flex space-x-4 mt-4">
                <button id="addToCartBtn" class="mb-10 bg-green-600 text-white rounded-md hover:bg-green-800 font-bold py-2 px-4 flex items-center justify-center text-center text-lg">
                    Agregar al Carrito
                </button>
                <button id="addToFavoritesBtn" class="mb-10 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 font-bold py-2 px-4 flex items-center justify-center text-center text-lg">
                    Agregar a Favoritos
                </button>
            </div>
        `;
        productDetails.appendChild(productElement);

        // Función para agregar producto al carrito
        function addToCart(product) {
            // Obtener el usuario actualmente logueado desde sessionStorage
            const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

            // Verificar si hay un usuario logueado
            if (!currentUser) {
                alert("Debes iniciar sesión para agregar productos al carrito.");
                window.location.href = "/src/views/login.html"; // Redirigir al login si no hay sesión iniciada
                return;
            }

            // Obtener todos los usuarios desde localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Buscar al usuario por su correo electrónico
            const userIndex = users.findIndex((user) => user.email === currentUser.email);

            // Verificar si se encontró al usuario
            if (userIndex !== -1) {
                // Agregar producto al carrito del usuario
                if (!users[userIndex].cartItems) {
                    users[userIndex].cartItems = [];
                }
                users[userIndex].cartItems.push({ ...product, quantity: 1 });

                // Actualizar usuarios en localStorage
                localStorage.setItem("users", JSON.stringify(users));

                // Mostrar mensaje de éxito
                alert("Producto agregado al carrito.");
            } else {
                alert("Usuario no encontrado. Por favor, inicia sesión nuevamente.");
                window.location.href = "/src/views/login.html"; // Redirigir al login si no se encuentra el usuario
            }
        }

        // Evento para agregar al carrito
        const addToCartBtn = document.getElementById("addToCartBtn");
        addToCartBtn.addEventListener("click", function (event) {
            event.preventDefault();

            // Llamar a la función para agregar al carrito
            addToCart(product);
        });


        // Agregar lógica para el botón de "Agregar a Favoritos"
        const addToFavoritesBtn = document.getElementById("addToFavoritesBtn");
        addToFavoritesBtn.addEventListener("click", function () {
            // Obtener la lista actual de productos favoritos desde localStorage
            const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];

            // Verificar si el producto ya está en favoritos
            if (favoriteProducts.some((p) => p.id === product.id)) {
                alert("Este producto ya está en tus favoritos.");
                return;
            }

            // Agregar el producto a la lista de favoritos
            favoriteProducts.push(product);

            // Actualizar localStorage
            localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));

            // Mostrar mensaje de éxito (opcional)
            alert("Producto agregado a favoritos.");

            // Opcional: Cambiar el texto o estilo del botón después de agregar a favoritos
            addToFavoritesBtn.textContent = "Agregado a Favoritos";
            addToFavoritesBtn.classList.remove("bg-yellow-500", "hover:bg-yellow-600");
            addToFavoritesBtn.classList.add("bg-gray-300", "cursor-default");
            addToFavoritesBtn.disabled = true;
        });
    } else {
        console.log("Producto no encontrado");
    }

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
