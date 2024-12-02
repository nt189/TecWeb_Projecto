<?php
    namespace projtecweb\myapi\Product;
    require_once __DIR__ . '/../vendor/autoload.php';


    if( isset($_GET['search']) ) {

        $product = new Product();
        $product->searchAndList($_GET['search']);


        echo $product->getData();
    }


?>