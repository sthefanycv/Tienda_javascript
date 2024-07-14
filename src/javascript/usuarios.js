document.addEventListener('DOMContentLoaded', function () {
    const userList = document.getElementById('userList');
    const editUserModal = document.getElementById('editUserModal');
    const editUserForm = document.getElementById('editUserForm');
    const addUserBtn = document.getElementById('addUserBtn');
    let currentUserId = null; // Variable global para almacenar temporalmente el ID del usuario seleccionado para editar

    // Función para obtener usuarios del localStorage
    function obtenerUsuarios() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        return users;
    }

    // Función para guardar usuarios en el localStorage
    function guardarUsuarios(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Función para mostrar la lista de usuarios en una tabla
    function mostrarUsuarios() {
        const users = obtenerUsuarios();

        userList.innerHTML = '';

        users.forEach(user => {
            const userRow = document.createElement('div');
            userRow.classList.add('flex', 'items-center', 'justify-between', 'px-6', 'py-3', 'text-sm', 'leading-5',
                'text-gray-900', 'border-b', 'border-gray-200');

            // Mostrar cada propiedad del usuario como una celda de tabla
            Object.keys(user).forEach(key => {
                const cell = document.createElement('div');
                cell.textContent = user[key];
                cell.classList.add('flex-1', 'whitespace-no-wrap', 'overflow-hidden');
                userRow.appendChild(cell);
            });

            // Botones de editar y eliminar
            const actions = document.createElement('div');
            actions.classList.add('flex', 'space-x-2');

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-1', 'px-2',
                'rounded', 'focus:outline-none', 'focus:shadow-outline');
            editButton.addEventListener('click', () => abrirModalEditar(user));
            actions.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-1', 'px-2',
                'rounded', 'focus:outline-none', 'focus:shadow-outline');
            deleteButton.addEventListener('click', () => eliminarUsuario(user.id));
            actions.appendChild(deleteButton);

            userRow.appendChild(actions);

            userList.appendChild(userRow);
        });
    }

    // Función para abrir el modal de edición con los datos del usuario
    function abrirModalEditar(user) {
        // Rellenar el formulario con los datos del usuario
        document.getElementById('editNombre').value = user.nombre;
        document.getElementById('editApellido').value = user.apellido;
        document.getElementById('editEmail').value = user.email;

        // Asignar el ID del usuario actual
        currentUserId = user.id;

        // Mostrar el modal
        editUserModal.classList.remove('hidden');
    }

    // Función para cerrar el modal de edición
    function cerrarModalEditar() {
        // Limpiar el formulario
        editUserForm.reset();

        // Ocultar el modal
        editUserModal.classList.add('hidden');

        // Restablecer el ID del usuario actual
        currentUserId = null;
    }

    // Evento submit del formulario de edición
    editUserForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener datos del formulario
        const nombre = document.getElementById('editNombre').value;
        const apellido = document.getElementById('editApellido').value;
        const email = document.getElementById('editEmail').value;

        // Obtener usuarios del localStorage
        let users = obtenerUsuarios();

        // Encontrar el índice del usuario a editar
        const index = users.findIndex(user => user.id === currentUserId);

        // Actualizar los datos del usuario
        users[index].nombre = nombre;
        users[index].apellido = apellido;
        users[index].email = email;

        // Guardar los usuarios actualizados en el localStorage
        guardarUsuarios(users);

        // Volver a mostrar la lista de usuarios
        mostrarUsuarios();

        // Cerrar el modal
        cerrarModalEditar();
    });

 // Función para eliminar un usuario por índice
 function eliminarUsuario(index) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        // Obtener usuarios del localStorage
        let users = obtenerUsuarios();

        // Eliminar el usuario por índice
        users.splice(index, 1);

        // Guardar los usuarios actualizados en el localStorage
        guardarUsuarios(users);

        // Volver a mostrar la lista de usuarios
        mostrarUsuarios();
    }
}
    // Evento click del botón para añadir usuario
    addUserBtn.addEventListener('click', function () {
        // Redirigir a la página de registro para crear un nuevo usuario
        window.location.href = '/src/views/register.html';
    });

    // Llamar a la función para mostrar usuarios al cargar la página
    mostrarUsuarios();
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