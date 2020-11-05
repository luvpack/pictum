<?php
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

    if (empty($_POST) || (empty($_POST["email"]) || empty($_POST["password"])
        || empty($_POST["firstName"]) || empty($_POST["lastName"]) )) {
        http_response_code(400);
        print json_encode(['status' => false, "message" => "Not provided data"]);
        return;
    }
    include_once('../../config/database.php');
    include_once('../../objects/user.php');

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    $user->email = $_POST["email"];
    $user->password = $_POST["password"];
    $user->firstName = $_POST["firstName"];
    $user->lastName = $_POST["lastName"];

    $create_user_result = $user->create();

    if ($create_user_result) {
        $new_user_id = mysqli_insert_id($db);
        try {
            $new_user_query = "SELECT `id`, `email`, `firstName`, `lastName`, `avatar_url`, `team_id` FROM users WHERE `id`='$new_user_id';";
            $new_user_obj = mysqli_query($db, $new_user_query);

            // header('Location: /login.php?action=login');

            print json_encode(['status' => true, 'message'=> 'Successfull registered!','data' => $new_user_obj->fetch_object()]);

        } catch (Exception $th) {
            print json_encode($th);
        }
    } else {
        print json_encode(['status' => false, "error" => "Ошибка создания пользователя", "message" => mysqli_error($this->connection)]);
    }

?>
