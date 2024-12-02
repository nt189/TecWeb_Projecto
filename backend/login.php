<?php
use projtecweb\myapi\Validaciones\Validaciones;
require_once __DIR__ . '/myapi/Validaciones/Validaciones.php';

header('Content-Type: application/json');

try {
    $log = new Validaciones();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonOBJ = json_decode(file_get_contents('php://input'));
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON input');
        }
        $response = $log->Login($jsonOBJ);
        echo $response;
    } else {
        throw new Exception('Invalid request method');
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(['error' => 'Error en el servidor']);
}
?>

