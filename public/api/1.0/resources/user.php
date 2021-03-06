<?php
require_once 'class/token_class.php';
require_once 'class/user_class.php';
require_once 'lib/json_array.php';

$app->get('/rest/user/{id}', function (
    $request,
    $response,
    $args
) {
    if (!Token::validate()) {
        $response->getBody()->write(NO_LOGIN_MESSAGE);
        return $response->withStatus(UNAUTHORIZED);
    }

    $uid = $args['id'];
    $user = User::byId($uid);

    if (is_null($user)) {
        $errorString = "The requested user with the id $uid does not exist";
        $response->getBody()->write($errorString);
        return $response->withStatus(NOT_FOUND);
    }

    $userJson = $user->toJson();
    return $response->getBody()->write($userJson);
});

$app->put('/rest/user', function(
    $request,
    $response,
    $args
) {
    if (!Token::validate()) {
        $response->getBody()->write(NO_LOGIN_MESSAGE);
        return $response->withStatus(UNAUTHORISED);
    }

    $user = User::byArray($request->getParsedBody());
    $oldUser = User::byId($user->user_id);

    $uid = $user->user_id;
    if (!Token::validateUser($uid)) {
        $errorString = "You are not allowed to change the user $uid";
        $response->getBody()->write($errorString);
        return $response->withStatus(FORBIDDEN);
    }

    $id = $user->update();
    if(is_null($id)) {
        $errorString = "username already exsits";
        $response->getBody()->write($errorString);
        return $response->withStatus(404);
    }

    $response->getBody()->write($id);
    return $response->withStatus(CREATED);
});

$app->delete('/rest/user/{id}', function (
    $request,
    $response,
    $args
) {
    if (!Token::validate()) {
        $response->getBody()->write(NO_LOGIN_MESSAGE);
        return $response->withStatus(UNAUTHORIZED);
    }

    if (!Token::validateUser($args["id"])) {
        $errorString = "You are not allowed to delete a other user";
        $response->getBody()->write($errorString);
        return $response->withStatus(FORBIDDEN);
    }

    $uid = $args['id'];
    $user = User::byId($uid);

    if (is_null($user)){
        $errorString = "The user with the id $uid does not exist";
        $response->getBody()->write($errorString);
        return $response->withStatus(NOT_FOUND);
    }

    if ($user->delete()) {
        return $response->withStatus(NO_CONTENT);
    }

    $errorString = "The DELETE on the database failed";
    $response->getBody()->write($errorString);
    return $response->withStatus(500);
});

$app->get('/rest/user', function (
    $request,
    $response,
    $args
) {
    if (!Token::validate()) {
        $response->getBody()->write(NO_LOGIN_MESSAGE);
        return $response->withStatus(UNAUTHORIZED);
    }

    $userName = $request->getQueryParam('name', null);
    $usersByName = USER::search($userName);
    $userJson = arrayToJSON($usersByName);

    return $response->getBody()->write($userJson);
});
?>
