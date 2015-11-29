<?php

  /*
  $isValid = false;
  $referer = $_SERVER['HTTP_REFERER'];
  $validReferers = array('superlist.dev', 'superlist.rc', 'superlist.lucasramos.me');

  foreach ($validReferers as $ref) {
    if (strpos($referer, $ref)) {
      $isValid = true;
      break;
    }
  }

  if ($isValid == false) {
    die('Referer not authorized!');
  }
  */

  if ($_GET['trust'] != 'me') {
    die('Not trusted!');
  }
?>
