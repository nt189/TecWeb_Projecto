$(document).ready(function() {
    $('.formulario_register').submit(function(e) {
        e.preventDefault();
        
        const username = $('#nomCafeteria').val().trim();
        const password = $('#Contraseña').val().trim();
        const confirmPassword = $('#Contraseña2').val().trim();
        const ubicacion = $('#Ubicacion').val().trim();

        if (username === "" || password === "" || confirmPassword === "" || ubicacion === "") {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const datosRegistro = {
            'username': username,
            'password': password,
            'ubicacion': ubicacion
        };

        $.ajax({
            url: 'backend/register.php',
            type: 'POST',
            data: JSON.stringify(datosRegistro),
            success: function(respuesta) {
                try {
                    const resultado = JSON.parse(respuesta);
                    if (resultado.status === 'success') {
                        alert('Usuario registrado exitosamente');
                        $('.formulario_register')[0].reset();
                    } else {
                        alert('Error al registrar usuario: ' + resultado.message);
                    }
                } catch (error) {
                    console.error('Error al procesar la respuesta:', error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud AJAX:', textStatus, errorThrown);
            }
        });
    });
});
