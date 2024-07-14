// Función para validar el formato de correo electrónico
function validateEmail(email) {
    // Regex para validar correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).toLowerCase());
}

// Función para validar la clave
function validatePassword(password) {
    // Regex para validar clave
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_/.#$])[A-Za-z\d-_/.#$]{8,}$/;
    return passwordRegex.test(password);
}

// Función para iniciar sesión
function loginUser(email, password) {
    // Obtener usuarios del LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar usuario por correo electrónico y clave
    const user = users.find(user => user.email === email && user.clave === password);

    // Validar si el usuario existe y las credenciales son correctas
    if (user) {
        // Iniciar sesión exitosa
        alert('Inicio de sesión exitoso.');

        // Guardar información de sesión (opcional)
        sessionStorage.setItem('currentUser', JSON.stringify(user));

        // Establecer sesión iniciada en localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Establecer el rol del usuario en localStorage
        localStorage.setItem('rol', user.rol);

        // Redirigir a la página de perfil de usuario
        window.location.href = '/src/views/perfil.html'; // Ajusta la ruta según tu estructura de archivos
    } else {
        // Mostrar mensaje de error si las credenciales son incorrectas
        alert('Correo electrónico o contraseña incorrectos.');
    }
}

// Evento para manejar el envío del formulario de inicio de sesión
document.querySelector('#loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Validar formato de correo electrónico
    if (!validateEmail(email)) {
        alert('Correo electrónico inválido. Por favor, verifica.');
        return;
    }

    // Validar formato de clave
    if (!validatePassword(password)) {
        alert('La clave debe contener al menos 8 caracteres con al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres: -_/.#$');
        return;
    }

    // Iniciar sesión
    loginUser(email, password);
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

  