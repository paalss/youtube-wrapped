<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
header("Access-Control-Allow-Origin: $http_origin");
// if ($http_origin == "http://www" || $http_origin == "http://localhost:8080") {
//   header("Access-Control-Allow-Origin: $http_origin");
// }
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// header("Access-Control-Allow-Headers: Origin");
// header("Access-Control-Allow-Credentials: true");
// header("Content-Type: application/json");

// echo "<pre>";
// ini_set('display_errors', 'On');
// ini_set('html_errors', 0);

$data = $_POST['fileName']; // testdata.json
// $data = $_POST['lastModified']; // 1650031382950
// $data = $_POST['file']; // undefined index
// $data = $_POST['val']; // undefined index
// $data = $_FILES["ee"]["name"]; // undefined index
// $data = [{filename: $_POST['fileName'] ee: $_POST['ee']}];


echo json_encode($data);
// echo "aaaaaaaaaaa";
