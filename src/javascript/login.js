// validar correo electrónico
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).toLowerCase());
}

// Validar clave
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_/.#$])[A-Za-z\d-_/.#$]{8,}$/;
    return passwordRegex.test(password);
}

// Establecer cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// valor de una cookie (Obtener el valor)
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Función para eliminar una cookie por su nombre
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Función para iniciar sesión
function loginUser(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.clave === password);

    if (user) {
        alert('Inicio de sesión exitoso.');

        // Guardar información de sesión en localStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('rol', user.rol);

        // Establecer cookies con expiración de 24 horas
        setCookie('currentUser', JSON.stringify(user), 1); // 1 día
        setCookie('isLoggedIn', 'true', 1); // 1 día
        setCookie('rol', user.rol, 1); // 1 día

        window.location.href = '/src/views/perfil.html';
    } else {
        alert('Correo electrónico o contraseña incorrectos.');
    }
}

// Evento para manejar el envío del formulario de inicio de sesión
document.querySelector('#loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!validateEmail(email)) {
        alert('Correo electrónico inválido. Por favor, verifica.');
        return;
    }

    if (!validatePassword(password)) {
        alert('La clave debe contener al menos 8 caracteres con al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres: -_/.#$');
        return;
    }

    loginUser(email, password);
    
});
document.addEventListener('DOMContentLoaded', function () {
    function checkSession() {
        const isLoggedInLocalStorage = localStorage.getItem('isLoggedIn');
        const isLoggedInCookie = getCookie('isLoggedIn');

        const loginButton = document.getElementById('login'); // Asignar dentro de checkSession

        if (isLoggedInLocalStorage === 'true' || isLoggedInCookie === 'true') {
            loginButton.href = '/src/views/perfil.html';
        } else {
            loginButton.href = '/src/views/login.html';
        }
    }

    checkSession();
});

