<?php
header('Content-Type: application/json');
require_once '../DataBase.php';
require_once 'Create.php';

$json = json_decode(file_get_contents('php://input'));
$create = new projtecweb\myapi\validaciones('nombre_de_tu_base');

echo $create->Signin($json);
?>
