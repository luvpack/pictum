<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Max-Age: 3600');
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once('../../config/database.php');
    include_once('../../objects/team.php');

    $database = new Database();
    $db = $database->connect();

    $team = new Team($db);
    
    $data = $_POST;

    if (!empty($data)) {
        echo 'all ok';
    } else {
        echo 'empty body';
    }

?>