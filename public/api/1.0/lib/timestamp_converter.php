<?php

function convertTimestampToDateTime($timestamp)
{
    $timestamp = (int) $timestamp/1000;
    $dateTime = new DateTime();
    $dateTime->setTimestamp($timestamp);
    return $dateTime;
}

function convertDateTimeToTimestamp($dateTime)
{
    $timestamp = $dateTime->getTimestamp();
    $timestamp = $timestamp * 1000;
    return $timestamp;
}
?>
