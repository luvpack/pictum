<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET');
    header('Content-Type: application/json; utf-8');

    include_once '../../objects/collections.php';
    include_once '../../config/database.php';

    $database = new Database();
    $db = $database->connect();

    $collection_id = (int)$_GET['collection_id'];
    $limit = (int)$_GET['limit'];

    if (!$limit) $limit = 100;

    $collections = new Collections($db);

    $data = $collections->getPhotos($collection_id, $limit);

    print json_encode($data);
