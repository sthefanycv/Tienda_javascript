document.addEventListener("DOMContentLoaded", function () {
    // Obtener el contenedor del carrito
    const cartContainer = document.getElementById("cartContainer");
    // Obtener el contenedor del carrito vacío
    const emptyCartMessage = document.getElementById("emptyCart");
    // Obtener el contenedor del total del carrito
    const cartTotal = document.getElementById("cartTotal");
    // Obtener el contenedor del resumen del carrito
    const cartSummary = document.getElementById("cartSummary");

    // Función para obtener los productos del carrito desde localStorage
    function getCartItems() {
        // Obtener el usuario actualmente logueado desde sessionStorage
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        // Verificar si hay un usuario logueado
        if (!currentUser) {
            alert("Debes iniciar sesión para ver el carrito.");
            window.location.href = "/src/views/login.html"; // Redirigir al login si no hay sesión iniciada
            return [];
        }

        // Obtener todos los usuarios desde localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Buscar al usuario por su correo electrónico
        const user = users.find((user) => user.email === currentUser.email);

        // Verificar si se encontró al usuario y si tiene productos en el carrito
        if (user && user.cartItems) {
            return user.cartItems;
        } else {
            return [];
        }
    }

    // Función para calcular el total del carrito
    function calculateTotal() {
        const cartItems = getCartItems();
        let total = cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        return total.toFixed(2);
    }

    // Función para renderizar los productos del carrito
    function renderCart() {
        // Limpiar el contenido previo del carrito
        cartContainer.innerHTML = "";

        // Obtener los productos del carrito
        const cartItems = getCartItems();

        if (cartItems.length === 0) {
            // Mostrar mensaje de carrito vacío si no hay productos
            emptyCartMessage.style.display = "block";
            cartSummary.style.display = "none";
        } else {
            // Ocultar mensaje de carrito vacío si hay productos
            emptyCartMessage.style.display = "none";
            cartSummary.style.display = "block";

            // Iterar sobre los productos del carrito
            cartItems.forEach((product) => {
                // Crear el HTML para cada producto del carrito
                const productCard = document.createElement("div");
                productCard.classList.add("border", "rounded-md", "shadow-md", "p-4", "mb-4");

                productCard.innerHTML = `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <img src="${product.image}" alt="${product.name}" class="w-20 rounded-md mr-4">
                            <div>
                                <h2 class="text-lg font-bold">${product.name}</h2>
                                <p class="text-gray-600">$${product.price}</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <button class="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-900 mr-2" data-id="${product.id}" data-action="decrease">-</button>
                            <span class="text-xl">${product.quantity}</span>
                            <button class="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-900 ml-2" data-id="${product.id}" data-action="increase">+</button>
                            <button class="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 ml-2" data-id="${product.id}" data-action="remove">Eliminar</button>
                        </div>
                    </div>
                `;

                // Agregar eventos para los botones
                const buttons = productCard.querySelectorAll("button[data-id]");
                buttons.forEach(button => {
                    button.addEventListener("click", function () {
                        const productId = parseInt(this.getAttribute("data-id"));
                        const action = this.getAttribute("data-action");
                        if (action === "increase") {
                            increaseProductQuantity(productId);
                        } else if (action === "decrease") {
                            decreaseProductQuantity(productId);
                        } else if (action === "remove") {
                            removeProductFromCart(productId);
                        }
                    });
                });

                // Agregar el producto al contenedor del carrito
                cartContainer.appendChild(productCard);
            });

            // Actualizar el total del carrito
            cartTotal.textContent = calculateTotal();
        }
    }

    // Función para incrementar la cantidad de un producto en el carrito
    function increaseProductQuantity(productId) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        // Encontrar al usuario por su email
        const userIndex = users.findIndex((user) => user.email === currentUser.email);

        if (userIndex !== -1) {
            // Incrementar la cantidad del producto en el carrito del usuario
            users[userIndex].cartItems.forEach((product) => {
                if (product.id === productId) {
                    product.quantity++;
                }
            });

            // Actualizar el localStorage con los nuevos datos del usuario
            localStorage.setItem("users", JSON.stringify(users));
        }

        // Volver a renderizar el carrito
        renderCart();
    }

    // Función para decrementar la cantidad de un producto en el carrito
    function decreaseProductQuantity(productId) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        // Encontrar al usuario por su email
        const userIndex = users.findIndex((user) => user.email === currentUser.email);

        if (userIndex !== -1) {
            // Decrementar la cantidad del producto en el carrito del usuario
            users[userIndex].cartItems.forEach((product) => {
                if (product.id === productId && product.quantity > 1) {
                    product.quantity--;
                }
            });

            // Actualizar el localStorage con los nuevos datos del usuario
            localStorage.setItem("users", JSON.stringify(users));
        }

        // Volver a renderizar el carrito
        renderCart();
    }

    // Función para eliminar un producto del carrito
    function removeProductFromCart(productId) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        // Encontrar al usuario por su email
        const userIndex = users.findIndex((user) => user.email === currentUser.email);

        if (userIndex !== -1) {
            // Filtrar los productos para eliminar el producto con el id especificado
            users[userIndex].cartItems = users[userIndex].cartItems.filter((product) => product.id !== productId);

            // Actualizar el localStorage con los nuevos datos del usuario
            localStorage.setItem("users", JSON.stringify(users));
        }

        // Volver a renderizar el carrito
        renderCart();
    }

    // Llamar a la función inicial para renderizar el carrito
    renderCart();
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

      // Función para verificar si hay sesión iniciada
      function checkSession() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
  
        if (isLoggedIn === 'true') {
          // Usuario tiene sesión iniciada, redirigir a perfil.html
          payBottom.href = '/src/views/pago.html';
        } else {
          // Usuario no tiene sesión iniciada, redirigir a login.html
          payBottom.href = '/src/views/login.html';
        }

      // Llamar a la función al cargar la página para establecer el enlace inicial
      checkSession()}

      