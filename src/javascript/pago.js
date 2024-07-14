document.addEventListener("DOMContentLoaded", function () {
    // Obtener el contenedor del resumen del carrito
    const cartSummary = document.getElementById("cartSummary");
    // Obtener el contenedor del comprobante de pago
    const paymentReceipt = document.getElementById("paymentReceipt");
    // Obtener el contenedor de los elementos del recibo
    const receiptItemsContainer = document.getElementById("receiptItems");
    // Obtener el contenedor del total del recibo
    const receiptTotal = document.getElementById("receiptTotal");

    // Función para obtener los productos del carrito desde localStorage
    function getCartItems() {
        // Obtener el usuario actualmente logueado desde sessionStorage
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        // Verificar si hay un usuario logueado y obtener sus carItems
        if (currentUser && currentUser.email) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.email === currentUser.email);

            if (user && user.cartItems) {
                return user.cartItems;
            }
        }

        return [];
    }

    // Función para calcular el total del carrito
    function calculateTotal(cartItems) {
        return cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2);
    }

    // Función para renderizar el resumen del carrito en la página de pago
    function renderCartSummary() {
        // Limpiar el contenido previo del resumen del carrito
        cartSummary.innerHTML = "";

        // Obtener los productos del carrito
        const cartItems = getCartItems();

        // Mostrar un mensaje si el carrito está vacío
        if (cartItems.length === 0) {
            cartSummary.innerHTML = "<p>Tu carrito está vacío.</p>";
            return;
        }

        // Crear el HTML para el resumen del carrito
        const summaryHTML = `
            <h2 class="text-2xl text-[#272727] font-bold mb-4">Resumen de Compra</h2>
            <ul class="divide-y divide-gray-300">
                ${cartItems.map(product => `
                    <li class="py-2">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center">
                                <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
                                <div class="ml-4">
                                    <h3 class="text-lg font-semibold">${product.name}</h3>
                                    <p class="text-gray-600">$${product.price} x ${product.quantity}</p>
                                </div>
                            </div>
                            <p class="font-semibold">$${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    </li>
                `).join("")}
            </ul>
            <div class="mt-4 text-lg text-green-600 font-bold">Total: $${calculateTotal(cartItems)}</div>
        `;

        // Insertar el HTML en el contenedor del resumen del carrito
        cartSummary.innerHTML = summaryHTML;
    }

    // Función para procesar el pago
    function processPayment(event) {
        event.preventDefault(); // Evitar que se envíe el formulario

        // Validar la información del formulario
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const cardName = document.getElementById("cardName").value.trim();
        const cardLastName = document.getElementById("cardLastName").value.trim();
        const cardExpiration = document.getElementById("cardExpiration").value.trim();

        // Expresiones regulares
        const cardNumberPattern = /^\d{16}$/; // Número de tarjeta de 16 dígitos
        const cardNamePattern = /^[a-zA-Z\s]+$/; // Nombre en la tarjeta solo letras y espacios
        const cardLastNamePattern = /^[a-zA-Z\s]+$/; // Apellido en la tarjeta solo letras y espacios
        const cardExpirationPattern = /^\d{4}-(0[1-9]|1[0-2])$/; // Fecha de expiración formato YYYY-MM

        // Validación
        if (!cardNumberPattern.test(cardNumber)) {
            alert("El número de tarjeta debe ser un número de 16 dígitos.");
            return;
        }

        if (!cardNamePattern.test(cardName)) {
            alert("El nombre en la tarjeta solo debe contener letras y espacios.");
            return;
        }

        if (!cardLastNamePattern.test(cardLastName)) {
            alert("El apellido en la tarjeta solo debe contener letras y espacios.");
            return;
        }

        if (!cardExpirationPattern.test(cardExpiration)) {
            alert("La fecha de expiración debe estar en el formato YYYY-MM.");
            return;
        }

        // Simular proceso de pago exitoso (aquí puedes implementar la lógica real de pago)
        // Supongamos que aquí tendrías una integración con algún servicio de pago y validarías la tarjeta

        // Mostrar el comprobante de pago
        showPaymentReceipt();
    }

    // Función para mostrar el comprobante de pago
    function showPaymentReceipt() {
        // Obtener los productos del carrito
        const cartItems = getCartItems();

        // Limpiar el contenido previo del recibo
        receiptItemsContainer.innerHTML = "";

        // Mostrar cada producto en el recibo
        cartItems.forEach(product => {
            const itemHTML = `
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
                        <div class="ml-4">
                            <h3 class="text-lg font-semibold">${product.name}</h3>
                            <p class="text-gray-600">$${product.price} x ${product.quantity}</p>
                        </div>
                    </div>
                    <p class="font-semibold">$${(product.price * product.quantity).toFixed(2)}</p>
                </div>
            `;
            receiptItemsContainer.innerHTML += itemHTML;
        });

        // Mostrar el total pagado
        receiptTotal.textContent = calculateTotal(cartItems);

        // Mostrar el contenedor del comprobante de pago y ocultar el formulario
        paymentReceipt.classList.remove("hidden");
        document.getElementById("paymentForm").classList.add("hidden");
    }

    // Escuchar el evento submit del formulario de pago
    document.getElementById("paymentForm").addEventListener("submit", processPayment);

    // Renderizar el resumen del carrito al cargar la página
    renderCartSummary();
});

document.addEventListener('DOMContentLoaded', function () {
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
