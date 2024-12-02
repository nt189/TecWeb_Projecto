// ---------------------------------- Animaciones ---------------------------------------
document.getElementById("btn_inicio").addEventListener("click", inciarSesion);
document.getElementById("btn_registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPagina);

//Declaración de variables
var contenedor_login_register = document.querySelector(".contenedor_login-register");
var formulario_login = document.querySelector(".formulario_login");
var formulario_register = document.querySelector(".formulario_register");
var caja_trasera_login = document.querySelector(".caja_trasera-login");
var caja_trasera_register = document.querySelector(".caja_trasera-register");

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "600px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "600px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

function anchoPagina() {
    if (window.innerWidth > 850) {
        caja_trasera_login.style.display = "block";
        caja_trasera_register.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "0px";
    }
}

function inciarSesion() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "190px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}
inciarSesion();

// -------------------------------------------- Demas -----------------------------------------

// Función para el registro
function handleRegister(event) {
    event.preventDefault();

    const data = {
        username: document.getElementById('nomCafeteria').value,
        password: document.getElementById('Contraseña').value,
        confirmPassword: document.getElementById('Contraseña2').value,
        ubicacion: document.getElementById('Facultad').value,
    };

    // Validar que todos los campos estén llenos
    if (!data.username || !data.password || !data.confirmPassword || !data.ubicacion) {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Validar contraseñas coincidentes
    if (data.password !== data.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'backend/register.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert('Registro exitoso');
                    } else {
                        console.error('Error del servidor:', response.error);
                    }
                } catch (e) {
                    console.error('Error en la respuesta del servidor:', xhr.responseText);
                }
            } else {
                console.error('Error en el servidor:', xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

// Función para el inicio de sesión
function handleLogin(event) {
    event.preventDefault();

    const data = {
        username: document.getElementById('cargar_correo').value,
        password: document.getElementById('cargar_contraseña').value, // Corregido el ID del campo de contraseña
    };

    // Validar que todos los campos estén llenos
    if (!data.username || !data.password) {
        alert('Todos los campos son obligatorios');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'backend/login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert('Inicio de sesión exitoso');
                        window.location.href = 'pagina-principal.html';
                    } else {
                        console.error('Error del servidor:', response.error);
                    }
                } catch (e) {
                    console.error('Error en la respuesta del servidor:', xhr.responseText);
                }
            } else {
                console.error('Error en el servidor:', xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

// Añadir los event listeners para los formularios
document.querySelector('.formulario_register').addEventListener('submit', handleRegister);
document.querySelector('.formulario_login').addEventListener('submit', handleLogin);

