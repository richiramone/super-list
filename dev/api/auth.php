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
    header('HTTP/1.1 401 Unauthorized', true, 401);
    exit('Referer unauthorized!');
  }
  */

  if ($_GET['trust'] != 'me') {
    header('HTTP/1.1 401 Unauthorized', true, 401);
    exit('Not trusted!');
  }
?>
