<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
header("Access-Control-Allow-Origin: $http_origin");
header('Content-Type: application/json; charset=utf-8');

// tilgjengelige data fra <form>
//  echo $_POST['artist'];
//  echo $_POST['title'];
//  echo $_FILES['uploadedFile']['tmp_name'];
//  echo $_FILES['uploadedFile']['name'];

if (is_uploaded_file($_FILES['uploadedFile']['tmp_name'])) {
  $tmp_name = $_FILES['uploadedFile']['tmp_name'];
  $name = $_FILES['uploadedFile']['name'];

  // flytt filen til uploads mappa, og echo feedback

  if (move_uploaded_file($tmp_name, "uploads/$name")) {
    echo "Bilde lastet ned";
  } else {
    echo "Bildet ble ikke lastet ned";
  }
} else {
  echo "Du har ikke lastet opp noe bilde";
}