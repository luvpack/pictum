<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET");
    header("Content-Type: application/json");

    include_once('../../config/database.php');
    include_once('../../objects/user.php');

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    print json_encode($user->count());  
?>