// Función para guardar un producto en localStorage
const saveProduct = (product) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
};

// Función para actualizar un producto en localStorage
const updateProduct = (updatedProduct) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.map(product => {
        if (product.id === updatedProduct.id) {
            return updatedProduct;
        }
        return product;
    });
    localStorage.setItem('products', JSON.stringify(products));
};

// Función para eliminar un producto de localStorage
const deleteProduct = (id) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
};

// Función para manejar el envío del formulario de creación o edición de producto
const handleProductSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const imageFile = document.getElementById('productImage').files[0];
    const price = document.getElementById('productPrice').value.trim();
    const status = document.getElementById('productStatus').value;
    const description = document.getElementById('productDescription').value.trim();

    // Validar campos
    if (!name || !price || !status) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const namePattern = /^[\p{L}\p{N}\p{P}\p{Zs}]{2,}$/u; // Permite letras, números, puntuación y espacios
    const pricePattern = /^\d+(\.\d{1,2})?$/;
    const descriptionPattern = /^.{10,}$/u; // Permite cualquier carácter, mínimo 10 caracteres.

    if (!namePattern.test(name)) {
        alert('El nombre debe contener al menos 2 caracteres y puede incluir letras, números, puntuación y espacios.');
        return;
    }

    if (!pricePattern.test(price)) {
        alert('El precio debe ser un número válido, con hasta dos decimales.');
        return;
    }

    if (!descriptionPattern.test(description)) {
        alert('La descripción debe contener al menos 10 caracteres.');
        return;
    }

    if (!imageFile) {
        alert('Por favor, selecciona una imagen.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
        const image = reader.result;
        const product = {
            id: Date.now(),
            name: name,
            image: image,
            price: parseFloat(price),
            status: status,
            description: description
        };

        const editingProductId = document.getElementById('productForm').getAttribute('data-editing');

        if (editingProductId) {
            updateProduct({ ...product, id: parseInt(editingProductId) });
            alert('Producto actualizado');
            document.getElementById('saveButton').classList.remove('hidden');
            document.getElementById('updateButton').classList.add('hidden');
            document.getElementById('productForm').removeAttribute('data-editing');
        } else {
            saveProduct(product);
            alert('Producto guardado');
        }

        displayProducts();
        document.getElementById('productForm').reset();
    };

    reader.readAsDataURL(imageFile);
};

// Función para mostrar productos en la página de administración
const displayProducts = () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const adminProductsContainer = document.getElementById('adminProducts');
    adminProductsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('border', 'rounded-md', 'shadow', 'ml-4');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-50 object-cover rounded-md">
            <h2 class="text-lg font-bold mt-2 ml-4">${product.name}</h2>
            <p class="text-gray-600 ml-4">$${product.price}</p>
            <p class="text-gray-600 ml-4">${product.status}</p>
            <p class="text-gray-600 ml-4">${product.description}</p>
            <button onclick="editProduct(${product.id})" class="bg-yellow-500 text-white px-2 py-1 rounded mt-2 ml-4 mb-2">Editar</button>
            <button onclick="deleteProduct(${product.id})" class="bg-red-500 text-white px-2 py-1 rounded mt-2 ml-4 mb-6">Eliminar</button>
        `;
        adminProductsContainer.appendChild(productElement);
    });
};

// Función para cargar datos de un producto en el formulario para editar
const editProduct = (id) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(product => product.id === id);

    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStatus').value = product.status;
        document.getElementById('productDescription').value = product.description;

        document.getElementById('productForm').setAttribute('data-editing', product.id);
        document.getElementById('saveButton').classList.add('hidden');
        document.getElementById('updateButton').classList.remove('hidden');
    }
};

// Mostrar productos al cargar la página
document.addEventListener('DOMContentLoaded', displayProducts);

// Asignar el evento de envío del formulario para crear un nuevo producto
document.getElementById('productForm').addEventListener('submit', handleProductSubmit);

// Asignar el evento de clic para el botón de actualizar producto
document.getElementById('updateButton').addEventListener('click', handleProductSubmit);

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
