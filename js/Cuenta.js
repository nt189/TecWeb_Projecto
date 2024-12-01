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

// anchoPagina();

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
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const data = {
        email: document.getElementById('Correo').value,
        password: document.getElementById('Contraseña').value,
        confirmPassword: document.getElementById('Contraseña2').value,
        cafeteria: document.getElementById('nomCafeteria').value,
        facultad: document.getElementById('Facultad').value,
    };

    // Validar contraseñas coincidentes
    if (data.password !== data.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/backend/register.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert('Registro exitoso');
                } else {
                    alert(response.error);
                }
            } else {
                alert('Error en el servidor');
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

// Función para el inicio de sesión
function handleLogin(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const data = {
        email: document.getElementById('loginCorreo').value,
        password: document.getElementById('loginPassword').value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/backend/login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert('Inicio de sesión exitoso');
                    window.location.href = 'pagina-principal.html';
                } else {
                    alert(response.error);
                }
            } else {
                alert('Error en el servidor');
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

