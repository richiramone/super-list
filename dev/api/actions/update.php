<?php
  $json = file_get_contents(JSON);
  $items = json_decode($json, true);

  $items["items"][$_GET["id"]]["checked"] = $_GET["checked"];
  $items["items"][$_GET["id"]]["content"] = $_GET["content"];

  $newJson = json_encode($items);
  file_put_contents(JSON, $newJson);
?>
