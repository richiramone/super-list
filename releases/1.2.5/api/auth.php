<?php
  if ($_GET['trust'] != 'me') {
    header('HTTP/1.1 401 Unauthorized', true, 401);
    exit('Not trusted!');
  }
?>
