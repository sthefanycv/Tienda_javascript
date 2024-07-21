document.addEventListener('DOMContentLoaded', function () {
  // Verificar si hay sesión iniciada
  if (localStorage.getItem('isLoggedIn') === 'true') {
      // Obtener usuario actual de sessionStorage
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

      // Verificar si currentUser no es nulo
      if (currentUser) {
          // Mostrar datos del usuario en el perfil
          document.getElementById('userName').textContent = currentUser.nombre;
          document.getElementById('userLastName').textContent = currentUser.apellido;
          document.getElementById('userDOB').textContent = currentUser.fechaNacimiento;
          document.getElementById('userEmail').textContent = currentUser.email;
      } else {
          // Redirigir a la página de inicio de sesión si currentUser es nulo
          window.location.href = '/src/views/login.html';
      }
  } else {
      // Redirigir a la página de inicio de sesión si no hay sesión iniciada
      window.location.href = '/src/views/login.html';
  }

  // Botón Cerrar Sesión
  document.getElementById('logoutBtn').addEventListener('click', function () {
      // Limpiar sessionStorage y localStorage
      sessionStorage.removeItem('currentUser');
      localStorage.removeItem('isLoggedIn');
      
      // Eliminar el rol del usuario al cerrar sesión
      localStorage.removeItem('rol');

      // Redirigir a la página de inicio de sesión
      window.location.href = '/src/views/login.html';
  });

  // Verificar y mostrar el botón de usuarios según el rol
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('rol');
  const viewUsersBtn = document.getElementById('viewUsersBtn');

  if (isLoggedIn === 'true' && userRole === 'Admin') {
      viewUsersBtn.style.display = 'block';
  } else {
      viewUsersBtn.style.display = 'none';
  }
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
