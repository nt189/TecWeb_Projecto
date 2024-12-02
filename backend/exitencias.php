<?php
use projtecweb\myapi\Validaciones\Validaciones;
require_once __DIR__ . '/vendor/autoload.php';
$log = new Validaciones();
$datosCategoria = ["Bebida", "Dulceria", "Postres", "Comida Preparada"];
$cantidad= [];
for($i = 0; $i<4; $i++){
    $cantidad[] = $log->query("SELECT SUM(cantidad) FROM productos WHERE categoria = "+datosCategoria[$i]+";");
}
$respuesta = [
    "categoria" => $datosCategoria,
    "datos" => $cantidad,
];
echo json_encode($respuesta);

?>