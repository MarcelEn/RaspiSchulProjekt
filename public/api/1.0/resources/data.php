<?php

$app->post('/data/profile_picture', function ($request, $response, $args) {
    if(!Token::validate())  {
        return $response->withStatus(UNAUTHORIZED);
    }
    $files = $request->getUploadedFiles();
    $target_dir = "/var/www/html/profile_picture/";
    $target_file = $target_dir . Token::getUID();
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $check = getimagesize($_FILES["profile_picture"]["tmp_name"]);
    if($check == false) {
        $errorString = "File is not a image\n";
        $response->getBody()->write($errorString);
        return $response->withStatus(400);
    }
    if ($_FILES["profile_picture"]["size"] > 500000) {
        $errorString = "file is larger than 500KB\n";
        $response->getBody()->write($errorString);
        return $response->withStatus(400);
    }
    if (move_uploaded_file($_FILES["profile_picture"]["tmp_name"], $target_file)) {
        return $response->withStatus(201);
    } else {
        return $response->withStatus(500);
    }
});

?>
