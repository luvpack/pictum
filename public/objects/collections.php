<?php
    error_reporting(0);
    class Collections {
        private $connection;

        public function __construct($db)
        {
            $this->connection = $db;
        }

        public function get($id=false, $limit=false)
        {
            session_start();

            $userId = $_SESSION['userId'];

            if (!$userId) {
                http_response_code(401);
                die(['status' => false, 'message' => 'You isnt authenticated']);
            }

            $query = 'SELECT * FROM feedCollections ';

            if ($id) {
                $query = $query."WHERE id = $id";
            }

            if ($limit) {
                $query = $query." LIMIT $limit";
            }

            $collections = mysqli_query($this->connection, $query) or die(mysqli_error($this->connection));

            $collections_array = array();

            if (!$collections) {
                http_response_code(500);
                die(['status' => false, 'message' => 'Some error on server']);
            }

            while ($row = $collections->fetch_array(MYSQLI_ASSOC)) {
                $collections_array[] = $row;
            }

            return ['status' => true, 'collections' => $collections_array, 'count' => $collections->num_rows];
        }

        public function getPhotos ($collection_id, string $limit='100', string $offset='0')
        {
            session_start();

            $userId = $_SESSION['userId'];

            if (!$userId) {
                http_response_code(401);
                die(['status' => false, 'message' => 'You isnt authenticated']);
            }

            $query = "CALL get_collection_photos($collection_id, $limit, $offset)";

            $photos = mysqli_query($this->connection, $query) or die(mysqli_error($this->connection));

            if (!$photos) {
                http_response_code(500);
                return ['status' => false, 'message' => 'Some error'];
            }

            $photos_array = array();

            while ($row = $photos->fetch_array(MYSQLI_ASSOC)) {
                $photos_array[] = $row;
            }

            return ['status' => true, 'photos' => $photos_array, 'count' => $photos->num_rows];

        }
    }
