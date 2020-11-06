<?php
    include_once '../../../config/databasev2.php';

    error_reporting(0);

    if (isset($_GET['uploader_id'])) {
        $photos = R::find('photos', 'uploader_id = :uploader_id', [':uploader_id' => $_GET['uploader_id']]);
    } else {
        $photos = $photos = R::find('photos');
    }

    print json_encode($photos);


