<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET');
    header('Content-Type: application/json; utf-8');

    include_once '../../objects/collections.php';
    include_once '../../config/database.php';

    $database = new Database();
    $db = $database->connect();

    $id = (int)$_GET['id'];
    $limit = (int)$_GET['limit'];

    $collections = new Collections($db);

    $data = $collections->get($id);

    print json_encode($data);
