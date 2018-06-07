<?php

require_once 'class/token_class.php';
require_once 'class/calendar_class.php';
require_once 'class/appointment_class.php';

$app->get('/rest/appointment/{id}', function ($requ, $resp, $args) {
    if (!Token::validate()) {
        return $resp->withStatus(UNAUTHORITED);
    }

    $app = Appointment::get($args["id"]);

    if (is_unll($app)) {
        return $resp->withStatus(NOT_FOUND);
    }

    $cal = CalendarModel::get($app->calendar_id);
    $owner = $cal->owner_id;
    $vis = $cal->visibility;

    if (!Token::validateUser($owner) && $vis == V_PRIVATE) {
        return $resp->withStatus(FORBIDDEN);
    }

    $json = $app->toJSON();
    $resp->getBody()->write($json);

    return $resp;
});

$app->post('/rest/appointment', function ($requ, $resp, $args) {
    if (!Token::validate()) {
        return $resp->withStatus(UNAUTORIZED);
    }

    $app = Appointment::fromArray($requ->getParsedBody());
    $cal = CalendarModel::get($app->calendar_id);
    $owner = $cal->owner_id;

    if (!Token::validateUser($owner)) {
        return $resp->withStatus(FORBIDDEN);
    }

    $id = $app->post();
	$resp->getBody()->write($id);

	return $resp->withStatus(CREATED);
});

$app->put('/rest/appointment', function ($requ, $resp, $args) {
    if (!Token::validate()) {
        return $resp->withStatus(UNAUTORIZED);
    }

    $app = CalendarModel::fromArray($requ->getParsedBody());
    $app_old = CalendarModel::get($cal->calendar_id);
    $calId = $app->calendar_id;
	$calId_old = $app_old->calendar_id;

    if (!is_null($app_old) && $calId != $calId_old) {
        return $resp->withStatus(FORBIDDEN);
    }

    $cal = CalendarModel::get($calId);
	$owner = $cal->owner_id;
	$vis = $cal->visibility;

    if (
        !Token::validateUser($owner) && ($vis<V_PUBLIC || is_null($app_old) )
    ) {
        return $resp->withStatus(FORBIDDEN);
    }

    $id = $app->put();
	$resp->getBody()->write($id);

    return $resp->withStatus(CREATED);
});

$app->delete('/rest/appointment/{id}', function ($requ, $resp, $args) {
    if (!Token::validate()) {
        return $resp->withStatus(UNAUTORIZED);
    }

    $app = CalendarModel::get($args['id']);

    if (is_null($app)) {
        return $resp->withStatus(NOT_FOUND);
    }

    if (!Token::validateUser($app->owner_id)){
        return $resp->withStatus(FORBIDDEN);
    }

    if($app->delete()) {
        return $resp->withStatus(NO_CONTENT);
    }

    return $resp->withStatus(500);
});

$app->get('/rest/appointment', function ($requ, $resp, $args) {
	if (!Token::validate()) {
        return $resp->withStatus(UNAUTHORITED);
    }

    $after = $requ->getQueryParam('after', NULL);
	$before = $requ->getQueryParam('before', NULL);
    $calId = $requ->getQueryParam('calendar_id', NULL);
    $cal = CalendarModel::get($calId);

	if (is_null($cal)) {
        return $resp->getBody()->write(arrayToJSON(array()));
    }

	$owner = $cal->owner_id;
    $visibility = $cal->visibility;

	if (!Token::validateUser($owner) && $visibility == V_PRIVATE) {
        return $resp->withStatus(FORBIDDEN);
    }
		
	$json = arrayToJSON(
        Appointment::searchAppointments($after, $before, $calId)
    );
	return $resp->getBody()->write($json);
});
?>
