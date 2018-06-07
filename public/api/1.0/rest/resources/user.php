<?php
require_once 'class/token_class.php';
require_once 'class/user_class.php';
require_once 'lib/json_array.php';

$app->get('/user/{id}', function ($request, $response, $args) {
    if (!Token::validate()) {
        return $response->withStatus(UNAUTHORIZED);
    }

    $user = User::get($args["id"]);

	if (is_null($user)) {
        return $response->withStatus(NOT_FOUND);
    }

    return $response->getBody()->write($user->toJSON());

});

$app->delete('/user/{id}', function ($request, $response, $args) {
    if (!Token::validate()) {
        return $response->withStatus(UNAUTHORIZED);
    }

    if (!Token::validateUser($args["id"])) {
        return $response->withStatus(FORBIDDEN);
    }

	$user = User::get($args["id"]);

	if (is_null($user)){
        return $response->withStatus(NOT_FOUND);
    }

	if ($user->delete()) {
	    return $response->withStatus(NO_CONTENT);
	}

	return $response->withStatus(500);
});

$app->get('/user', function ($requ, $resp, $args) {
    if (!Token::validate()) {
        return $response->withStatus(UNAUTHORIZED);
    }

	$name = $requ->getQueryParam('name', null);
    $json = arrayToJSON(USER::getByName($name));

    return $resp->getBody()->write($json);
});
?>
