<?php
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');

    if (empty($_POST) || (empty($_POST['email']) || empty($_POST['password']))) {
        // header('Location: /login.php');
        http_response_code(400);
        die(json_encode(['status' => false, 'message' => 'Not provided credentials', 'a' => $_POST]));
    }

    include_once('../../objects/user.php');
    include_once('../../config/database.php');

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    $status = $user->login($_POST['email'], $_POST['password']);

    if ($status['status'] === false) {
        $err = $status['message'];

        // header('Location: /login.php');
        header("Error: $err");
        http_response_code(400);

        print json_encode($status) ;
    } else {
        // header('Location: /-feed.php');
        $_SESSION['isLoggedIn'] = true;

        print json_encode($status);
    }
?>
