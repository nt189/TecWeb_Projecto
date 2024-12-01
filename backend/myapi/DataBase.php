<?php
namespace projtecweb\myapi;

abstract class DataBase {
    protected $conexion;
    protected $data;

    public function __construct($db, $user, $pass) {
        $this->conexion = @mysqli_connect(
            'localhost',
            $user,
            $pass,
            $db
        );
    
        /**
         * NOTA: si la conexión falló $conexion contendrá false
         **/
        if(!$this->conexion) {
            die('¡Base de datos NO conextada!');
        }
        /*else {
            echo 'Base de datos encontrada';
        }*/
        $this->data = array();
    }

    public function getData() {
        // SE HACE LA CONVERSIÓN DE ARRAY A JSON
        return json_encode($this->data, JSON_PRETTY_PRINT);
    }
}
?>