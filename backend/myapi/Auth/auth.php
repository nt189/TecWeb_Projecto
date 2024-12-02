<?php
namespace projtecweb\myapi\auth;

require_once __DIR__ . '/../DataBase.php';

class auth extends DataBase {
    public function registerUser($username, $password, $ubicacion) {
        try {
            // Check if user already exists
            $query = "SELECT * FROM users WHERE username = ?";
            $stmt = $this->conexion->prepare($query);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                return ['status' => 'error', 'message' => 'El usuario ya existe'];
            }

            // Insert new user
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $query = "INSERT INTO users (username, password, ubicacion) VALUES (?, ?, ?)";
            $stmt = $this->conexion->prepare($query);
            $stmt->bind_param("sss", $username, $hashedPassword, $ubicacion);

            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Usuario registrado exitosamente'];
            } else {
                return ['status' => 'error', 'message' => 'Error al registrar usuario'];
            }
        } catch (\Exception $e) {
            error_log('Error en Auth::registerUser: ' . $e->getMessage());
            return ['status' => 'error', 'message' => 'Error en el servidor'];
        }
    }
}
?>
