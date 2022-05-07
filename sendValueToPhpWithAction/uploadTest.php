<?php
// $data = $_POST['title'];
$data = $_FILES["fileToUpload"]["name"];

echo json_encode($data);
