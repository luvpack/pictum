<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once('../../config/database.php');
    include_once('../../objects/team.php');

    $database = new Database();
    $db = $database->connect();

    $team = new Team($db);

    $result = $team->read();

    if ($result) {
        http_response_code(200);
    } else {
        http_response_code(502);
    }

    echo json_encode($result);
?>