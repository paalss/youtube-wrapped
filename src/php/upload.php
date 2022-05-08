<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
header("Access-Control-Allow-Origin: $http_origin");
header('Content-Type: application/json; charset=utf-8');
$response = array();

try {
  // Undefined | Multiple Files | $_FILES Corruption Attack
  // If this request falls under any of them, treat it invalid.
  if (
    !isset($_FILES['uploadFile']['error']) ||
    is_array($_FILES['uploadFile']['error'])
  ) {
    throw new RuntimeException(json_encode($_FILES['uploadFile']['error']));
  }

  // Check $_FILES['uploadFile']['error'] value.
  switch ($_FILES['uploadFile']['error']) {
    case UPLOAD_ERR_OK:
      break;
    case UPLOAD_ERR_NO_FILE:
      throw new RuntimeException('No file sent.');
    case UPLOAD_ERR_INI_SIZE:
    case UPLOAD_ERR_FORM_SIZE:
      throw new RuntimeException('Exceeded filesize limit.');
    default:
      throw new RuntimeException('Unknown errors.');
  }

  // You should also check filesize here. 
  if ($_FILES['uploadFile']['size'] > 1000000) {
    throw new RuntimeException('Exceeded filesize limit.');
  }

  $tmpName = $_FILES['uploadFile']['tmp_name'];

  // DO NOT TRUST $_FILES['uploadFile']['mime'] VALUE !!
  // Check MIME Type by yourself.
  $finfo = new finfo(FILEINFO_MIME_TYPE);
  if (false === $ext = array_search(
    $finfo->file($tmpName),
    array(
      'json' => 'application/json',
      // 'jpg' => 'image/jpeg',
      // 'png' => 'image/png',
      // 'gif' => 'image/gif',
    ),
    true
  )) {
    throw new RuntimeException('Invalid file format.');
  }

  // You should name it uniquely.
  // DO NOT USE $_FILES['uploadFile']['name'] WITHOUT ANY VALIDATION !!
  // On this example, obtain safe unique name from its binary data.

  $shaName = sha1_file($tmpName); // c3474d052c5a43b095f836a60ff90df992344f18

  $filename = basename($tmpName); // php1F27.tmp

  if (!move_uploaded_file(
    $tmpName,
    sprintf(
      '../youtube-data/%s.%s',
      "watch-history",
      $ext
    )
    // sprintf(
    //   '../youtube-data/%s.%s',
    //   $filename,
    //   $ext
    // )
  )) {
    throw new RuntimeException('Failed to move uploaded file.');
  }

  $response = array(
    "status" => "success",
    // "fileContent" => $fileContentJson,
    "fileName" => $shaName,
    "error" => false,
    "message" => "File uploaded successfully"
  );
  echo json_encode($response);
} catch (RuntimeException $e) {
  $response = array(
    "status" => "error",
    "error" => true,
    "message" => $e->getMessage()
  );
  echo json_encode($response);
}