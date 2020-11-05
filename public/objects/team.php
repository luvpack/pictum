<?php
    class Team {
        private $connection;
        private $table_name = "teams";

        public $id;
        public $name;

        public function __construct($db)
        {
            $this->connection = $db;
        }

        public function read()
        {
            if (!$this->connection) {
                throw new Exception("Cant read data without connection.", 1);
            }

            $query = "SELECT id, name FROM ". $this->table_name;

            $users_query = "SELECT id, team_id FROM users";

            $users = mysqli_query($this->connection, $users_query)->fetch_all();
            $teams = mysqli_query($this->connection, $query)->fetch_all(MYSQLI_ASSOC);

            $result = array_map(function ($obj) use($users) {
                $filtered = array_filter($users, function ($user_obj) use ($obj) {
                    return $user_obj[1] === $obj['id'];
                });

                $related_users = array_map(function ($user_obj) { return $user_obj[1]; }, $filtered);
                $obj['members'] = $related_users;

                return $obj;
            }, $teams);

            return $result;
        }
    }
?>