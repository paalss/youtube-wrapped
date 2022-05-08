<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
header("Access-Control-Allow-Origin: $http_origin");
header('Content-Type: application/json; charset=utf-8');

if (is_uploaded_file($_FILES['uploadedFile']['tmp_name'])) {
  $tmp_name = $_FILES['uploadedFile']['tmp_name'];
  $name = $_FILES['uploadedFile']['name'];

  if (move_uploaded_file($tmp_name, "uploads/$name")) {
    echo "ok";
  } else {
    echo "fail";
  }
} else {
  echo "noattempt";
}