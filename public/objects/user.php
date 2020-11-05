<?php
    error_reporting(0);

    class User {
        private $connection;
        private $table_name = "users";

        public $email;
        public $password;
        public $firstName;
        public $lastName;
        public $team_id;

        public $token_secret = 'super_secret_key';

        public function __construct($db)
        {
            $this->connection = $db;
        }

        public function create()
        {
            session_start();

            $hash = password_hash($this->password, PASSWORD_BCRYPT);
            $ip = $_SERVER['REMOTE_ADDR'];

            $query = "INSERT INTO `users` (`email`, `password`, `firstName`, `lastName`, `ip`)
             VALUES ('$this->email', '$hash', '$this->firstName', '$this->lastName', '$ip');";

            $creating_result = mysqli_query($this->connection, $query) or die(mysqli_error($this->connection));

            return $creating_result;
        }

        public function me()
        {
                session_start();

                $userId = $_SESSION['userId'];

                if (!$userId) {
                    http_response_code(401);
                    return ['status' => false, 'message' => 'You isnt athenticated'];
                }

                $user = mysqli_query($this->connection, "SELECT `id`, `email`, `firstName`, `lastName`, `password`, `avatar_url`, `team_id`, `role_id` FROM `users` WHERE `id`='$userId';") or die(mysqli_error($this->connection));

                if (!$user) {
                    http_response_code(500);
                    return ['status' => false, 'message' => 'Some error'];
                }

                $userObj = $user->fetch_object();

                return ['status' => true, 'message' => $userObj];

        }

        public function login($email, $password)
        {
            session_start();

            $token = null;

            // получаем объект пользователя по идентификатору
            $user_object = mysqli_query($this->connection, "SELECT `id`, `email`, `firstName`, `lastName`, `password`, `avatar_url`, `team_id`, `role_id` FROM `users` WHERE `email`='$email';") or die(mysqli_error($this->connection));
            /* // количество идентичных элементов
            $count = mysqli_num_rows($user_object); */

            $user = $user_object->fetch_object();

            $verify_status = password_verify($password, $user->password);

            if (!$verify_status) {
                $_SESSION['user'] = false;
                http_response_code(400);
                return ['status' => false, 'message' => 'Authentication error.'];
            }

            $timestamp = mktime();
            $time = strtotime('+2 hours');
            $exp_date = date('Y-m-d H:i:s', $time);

            $ip = $_SERVER['REMOTE_ADDR'];
            $ua = $_SERVER['HTTP_USER_AGENT'];

            // $token_obj = [0 => ['iss' => 'http://localhost:7888', 'aud' => 'http://localhost:7888', 'exp'=> $exp_date, 'userEmail' => $user->email, 'userRoleId' => $user->role_id], 1 => []];

            // $token = hash_hmac('sha256', (['email' => $user->email, 'id' => $user->id, 'role_id' => $user->role_id, 'ip' => $ip, 'ua' => $ua].'.'.['createdAt' => $timestamp, 'expiresAt' => $exp_date]), $this->token_secret);

            // $dublicate_user_identity_tokens_query = "SELECT `token`, `ip`, `ua` FROM `tokens` WHERE `ip`='$ip' and `ua`='$ua'";
            // $dublicated_tokens = mysqli_query($this->connection, $dublicate_user_identity_tokens_query) or die(mysqli_error($this->connection));
            // $count_dublicated_tokens = mysqli_num_rows($dublicated_tokens);

            unset($user->password);
            $_SESSION['userId'] = $user->id;

            return ['status' => true, 'message' => 'Successful authenticated', 'data' => $user];

            /*if ($count_dublicated_tokens == 1) {
                $token = $dublicated_tokens->fetch_row()[0];

                $now_date = date('Y-m-d H:i:s');

                $update_last_auth_query = "UPDATE `tokens` SET `last_auth_at`='$now_date'";
                $update_result = mysqli_query($this->connection, $update_last_auth_query) or die(mysqli_error($this->connection));

                if (!$update_result) {
                    die('Cant update last auth date.');
                }

            } else {
                $create_token_query = "INSERT INTO `tokens` (`user_id`, `token`, `expiration_at`, `ip`, `ua`) VALUES ('$user->id', '$token', '$exp_date', '$ip', '$ua')";

                $result = mysqli_query($this->connection, $create_token_query) or die(mysqli_error($this->connection));

                if (!$result) {
                    die(mysqli_error($this->connection));
                }
            }*/

            //return ['token' => $token, 'user' => $user];
        }

        public function logout ()
        {
            session_start();

            $_SESSION = array();

            session_destroy();

            return ['status' => true, 'message' => 'ok'];
        }

        public function count()
        {
            $query = "SELECT COUNT(*) as count FROM `users`;";
            $result = mysqli_query($this->connection, $query) or die(mysqli_error($this->connection));

            return $result->fetch_object();
        }
    }
