<?php
namespace projtecweb\myapi\validaciones;

use projtecweb\myapi\DataBase;

class Create extends DataBase {

    public function __construct($db, $user = 'root', $pass = 'zP*liGgdxEbBXjyk') {
        parent::__construct($db, $user, $pass);
    }

    public function Login($jsonOBJ) {
        $email = $jsonOBJ->email ?? null;
        $password = $jsonOBJ->password ?? null;

        if (!$email || !$password) {
            return json_encode(['error' => 'Faltan datos de inicio de sesión'], JSON_PRETTY_PRINT);
        }

        $query = "SELECT * FROM cafeteria WHERE email = ${email} AND password = ${password}";
        $stmt = mysqli_prepare($this->conexion, $query);
        mysqli_stmt_bind_param($stmt, 'ss', $email, $password);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) > 0) {
            return json_encode(['success' => 'Inicio de sesión exitoso'], JSON_PRETTY_PRINT);
        } else {
            return json_encode(['error' => 'Credenciales incorrectas'], JSON_PRETTY_PRINT);
        }
    }

    public function Signin($jsonOBJ) {
        $email = $jsonOBJ->email ?? null;
        $password = $jsonOBJ->password ?? null;
        $cafeteria = $jsonOBJ->cafeteria ?? null;
        $facultad = $jsonOBJ->facultad ?? null;
    
        if (!$email || !$password || !$cafeteria || !$facultad) {
            return json_encode(['error' => 'Faltan datos para registrarse'], JSON_PRETTY_PRINT);
        }
    
        // Verificar si el usuario ya existe.
        $checkQuery = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = mysqli_prepare($this->conexion, $checkQuery);
        mysqli_stmt_bind_param($stmt, 's', $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    
        if (mysqli_num_rows($result) > 0) {
            return json_encode(['error' => 'El usuario ya existe'], JSON_PRETTY_PRINT);
        }
    
        // Insertar nuevo usuario.
        $insertQuery = "INSERT INTO usuarios (email, password, cafeteria, facultad) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($this->conexion, $insertQuery);
        mysqli_stmt_bind_param($stmt, 'ssss', $email, $password, $cafeteria, $facultad);
    
        if (mysqli_stmt_execute($stmt)) {
            return json_encode(['success' => 'Usuario registrado exitosamente'], JSON_PRETTY_PRINT);
        } else {
            return json_encode(['error' => 'Error al registrar usuario'], JSON_PRETTY_PRINT);
        }
    }    
}
?>
