<?php
  $json = file_get_contents(JSON);
  $items = json_decode($json, true);

  array_push($items["items"], array("checked" => false, "content" => $_GET["content"]));

  $newJson = json_encode($items);
  if(!file_put_contents(JSON, $newJson)) {
    header('HTTP/1.1 400 Bad request', true, 400);
  }
?>
