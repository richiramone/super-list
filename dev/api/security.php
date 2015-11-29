<?php
  if ($_GET['action'] == 'put' || $_GET['action'] == 'update') {
    foreach($_GET as $key => $value) {
        $_GET[$key] = htmlspecialchars($value, ENT_QUOTES|'ENT_SUBSTITUE', "UTF-8");
    }
  }
?>
