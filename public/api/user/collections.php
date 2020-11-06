<?php
    include_once '../../config/databasev2.php';

    session_start();

    $userId = $_SESSION['userId'];

    if (!isset($userId)) {
        http_response_code(401);
        die('You not authenticated');
    }

    $photos = R::findAll('feedCollections', 'author_id = :user_id', [':user_id' => $userId]);

    $result = array();

    foreach ($photos as $photo) {
        array_push($result, $photo);
    }

    print json_encode($result);
