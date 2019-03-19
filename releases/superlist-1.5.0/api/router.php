<?php
    include_once(DOCROOT . '/actions/' . $_GET['action'] . '.php');

    if ($_GET['action'] == 'get' || $_GET['action'] == 'put') {
        include_once(DOCROOT . '/views/get.php');
        header('Content-Type: text/html; charset=utf-8');
        echo $output;

        $items->free();
    }
?>
