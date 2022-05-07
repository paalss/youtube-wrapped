<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
header("Access-Control-Allow-Origin: $http_origin");

$targetPath = $_SERVER['DOCUMENT_ROOT'] ."/sider/annet/youtube-wrapped/uploadFile2/uploads/".basename($_FILES["uFile"]["name"]);
$data = move_uploaded_file($_FILES["uFile"]["tmp_name"], $targetPath);
echo json_encode($data);