// Función para validar el formato y longitud del nombre
function validateNombre(nombre) {
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}$/;
    return nombreRegex.test(nombre);
}

// Función para validar el formato y longitud del apellido
function validateApellido(apellido) {
    const apellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}$/;
    return apellidoRegex.test(apellido);
}

// Función para validar el formato de la fecha de nacimiento (YYYY-MM-DD)
function validateFechaNacimiento(fecha) {
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    return fechaRegex.test(fecha);
}

// Función para validar el formato y longitud del país
function validatePais(pais) {
    const paisRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}$/;
    return paisRegex.test(pais);
}

// Función para validar el formato y longitud de la ciudad
function validateCiudad(ciudad) {
    const ciudadRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}$/;
    return ciudadRegex.test(ciudad);
}

// Función para validar el formato y longitud de la dirección
function validateDireccion(direccion) {
    const direccionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s\-\_\/.#]{10,}$/;
    return direccionRegex.test(direccion);
}

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Función para validar que ambos correos electrónicos coincidan
function validateConfirmarEmail(email, confirmarEmail) {
    return email === confirmarEmail;
}

// Función para validar el formato de la clave
function validateClave(clave) {
    const claveRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_/.#$])[A-Za-z\d\-_/.#$]{8,}$/;
    return claveRegex.test(clave);
}

// Función para validar que ambas claves coincidan
function validateConfirmarClave(clave, confirmarClave) {
    return clave === confirmarClave;
}

// Función para validar el formato del código de referido (opcional)
function validateCodigoReferido(codigo) {
    if (codigo === "") return true; // Si está vacío es válido
    const codigoRegex = /^[a-zA-Z0-9]{10,}$/;
    return codigoRegex.test(codigo);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#registerForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener valores del formulario
        const nombre = document.querySelector("#nombre").value.trim();
        const apellido = document.querySelector("#apellido").value.trim();
        const fechaNacimiento = document.querySelector("#fechaNacimiento").value.trim();
        const pais = document.querySelector("#pais").value.trim();
        const ciudad = document.querySelector("#ciudad").value.trim();
        const direccion = document.querySelector("#direccion").value.trim();
        const email = document.querySelector("#correo").value.trim();
        const confirmarEmail = document.querySelector("#confirmarCorreo").value.trim();
        const clave = document.querySelector("#clave").value;
        const confirmarClave = document.querySelector("#confirmarClave").value;
        const codigoReferido = document.querySelector("#codigoReferido").value.trim();

        // Validar cada campo del formulario
        if (!validateNombre(nombre)) {
            alert("Nombre inválido. Debe contener al menos 2 caracteres válidos.");
            return;
        }

        if (!validateApellido(apellido)) {
            alert("Apellido inválido. Debe contener al menos 2 caracteres válidos.");
            return;
        }

        if (!validateFechaNacimiento(fechaNacimiento)) {
            alert("Fecha de Nacimiento inválida. Debe tener el formato YYYY-MM-DD.");
            return;
        }

        if (!validatePais(pais)) {
            alert("País inválido. Debe contener al menos 2 caracteres válidos.");
            return;
        }

        if (!validateCiudad(ciudad)) {
            alert("Ciudad inválida. Debe contener al menos 2 caracteres válidos.");
            return;
        }

        if (!validateDireccion(direccion)) {
            alert("Dirección inválida. Debe contener al menos 10 caracteres válidos.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Correo electrónico inválido. Por favor, verifica.");
            return;
        }

        if (!validateConfirmarEmail(email, confirmarEmail)) {
            alert("Los correos electrónicos no coinciden. Por favor, verifica.");
            return;
        }

        if (!validateClave(clave)) {
            alert("Clave inválida. Debe tener al menos 8 caracteres con al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres: -_/.#$");
            return;
        }

        if (!validateConfirmarClave(clave, confirmarClave)) {
            alert("Las claves no coinciden. Por favor, verifica.");
            return;
        }

        if (!validateCodigoReferido(codigoReferido)) {
            alert("Código de referido inválido. Debe contener al menos 10 caracteres válidos (letras y números).");
            return;
        }

        // Si todos los campos son válidos, se puede proceder con el registro (guardar en LocalStorage u otra acción)

        // Determinar el rol del usuario
        const rol = determineUserRole(email); // Llamar a la función para determinar el rol

        // Guardado en LocalStorage
        let newUser = {
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento,
            pais: pais,
            ciudad: ciudad,
            direccion: direccion,
            email: email,
            clave: clave,
            codigoReferido: codigoReferido,
            rol: rol,
            cartItems: [],
            favoriteProducts: []
        };

        // Guardar en LocalStorage o enviar al servidor para registro
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Guardar rol del usuario en LocalStorage
        localStorage.setItem("rol", rol);

        // Aviso de registro exitoso
        alert("Registro exitoso.");

        // Redirigir a la página principal
        window.location.href = "/src/index.html"; // Cambiar la ruta según tu estructura de archivos
    });

    // Función para determinar el rol del usuario basado en el email
    function determineUserRole(email) {
        if (email === "admin@example.com") {
            return "Admin";
        } else {
            return "Usuario";
        }
    }

    // Resto de tus funciones de validación aquí...
});


//boton

document.addEventListener('DOMContentLoaded', function() {
    // Verificar el rol almacenado en localStorage
    const rol = localStorage.getItem('rol');
    
    // Obtener el contenedor del botón de administrador
    const adminButtonContainer = document.getElementById('adminButtonContainer');
    
    // Verificar si el contenedor existe antes de intentar acceder a sus propiedades
    if (adminButtonContainer) {
        // Lógica para mostrar u ocultar el botón según el rol
        if (rol === 'Admin') {
            adminButtonContainer.style.display = 'block';  // Mostrar el contenedor del botón
        } else {
            adminButtonContainer.style.display = 'none';   // Ocultar el contenedor del botón
        }
    } else {
        console.error('Elemento adminButtonContainer no encontrado.');
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

  