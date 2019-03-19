<?php
    define("DOCROOT", $_SERVER["DOCUMENT_ROOT"] . '/api');

    include_once(DOCROOT . '/auth.php');
    include_once(DOCROOT . '/config.php');
    include_once(DOCROOT . '/security.php');

    $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if($db->connect_errno > 0){ die('Unable to connect to database ['.$db->connect_error.']'); }

    include_once(DOCROOT . '/router.php');

    $db->close();
?>
