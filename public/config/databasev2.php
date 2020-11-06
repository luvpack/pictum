<?php
    require __DIR__.'/../utils/redbean/rb-mysql.php';

    // class_alias('', '\R');

    R::setup('mysql:host=127.0.0.1;dbname=pictum', 'root', '', false);

    if (!R::testConnection()) die('No db connection');
