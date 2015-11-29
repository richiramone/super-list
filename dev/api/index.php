<?php
header('Content-Type: text/html');

define("DOCROOT", $_SERVER["DOCUMENT_ROOT"] . '/api');

include_once(DOCROOT . '/auth.php');
include_once(DOCROOT . '/config.php');
include_once(DOCROOT . '/router.php');

echo $html;
?>
