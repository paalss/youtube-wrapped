<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
header("Access-Control-Allow-Origin: $http_origin");
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// header("Access-Control-Allow-Headers: Origin");
// header("Access-Control-Allow-Credentials: true");
// header("Content-Type: image/png");

// echo "<pre>";
// ini_set('display_errors', 'On');
// ini_set('html_errors', 0);


echo json_encode("eeee");
// echo "aaaaaaaaaaa";
