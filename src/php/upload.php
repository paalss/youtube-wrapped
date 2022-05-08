<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
header("Access-Control-Allow-Origin: $http_origin");
header('Content-Type: application/json; charset=utf-8');
$response = array();

try {
  // Undefined | Multiple Files | $_FILES Corruption Attack
  // If this request falls under any of them, treat it invalid.
  if (
    !isset($_FILES['uploadedFile']['error']) ||
    is_array($_FILES['uploadedFile']['error'])
  ) {
    throw new RuntimeException('Invalid parameters.');
  }

  // Check $_FILES['uploadedFile']['error'] value.
  switch ($_FILES['uploadedFile']['error']) {
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
  if ($_FILES['uploadedFile']['size'] > 1000000) {
    throw new RuntimeException('Exceeded filesize limit.');
  }

  // DO NOT TRUST $_FILES['uploadedFile']['mime'] VALUE !!
  // Check MIME Type by yourself.
  $finfo = new finfo(FILEINFO_MIME_TYPE);
  if (false === $ext = array_search(
    $finfo->file($_FILES['uploadedFile']['tmp_name']),
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
  // DO NOT USE $_FILES['uploadedFile']['name'] WITHOUT ANY VALIDATION !!
  // On this example, obtain safe unique name from its binary data.
  if (!move_uploaded_file(
    $_FILES['uploadedFile']['tmp_name'],
    sprintf('../youtube-data/%s.%s',
      sha1_file($_FILES['uploadedFile']['tmp_name']),
      $ext
    )
  )) {
    throw new RuntimeException('Failed to move uploaded file.');
  }
  $response = array(
    "status" => "success",
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