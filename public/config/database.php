<?php
    class Database {
        private $user = "root";
        private $password = "";
        private $name = "pictum";
        private $host = "127.0.0.1";
        private $port = "3306";

        public $connection;

        public function connect()
        {
            $this->connection = mysqli_connect($this->host, $this->user, $this->password, $this->name, $this->port);

            mysqli_set_charset($this->connection, "utf8");

            if ($this->connection == false) {
                print("Ошибка подключение к БД. ".mysqli_connect_error());
            }

            return $this->connection;
        }

        public function query($query)
        {
            if ($this->connection) {
                $query_result = mysqli_query($this->connection, $query);
                // $result = mysqli_fetch_all($query_result);

                if ($query_result === false) {
                    print("Ошибка запроса к БД ".mysqli_error($this->connection));
                }

                return $query_result;
            } else {
                print("Database connection is not active.");
            }
        }
    }
?>
