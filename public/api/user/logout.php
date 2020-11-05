<?php
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');

    include_once('../../objects/user.php');
    include_once('../../config/database.php');

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    $status = $user->logout();

    // header('Location: /index.php');

