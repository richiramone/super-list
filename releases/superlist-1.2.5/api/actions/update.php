<?php
  $json = file_get_contents(JSON);
  $items = json_decode($json, true);

  $items["items"][$_GET["id"]]["content"] = $_GET["content"];

  $items['items'] = array_values($items['items']);
  $newJson = json_encode($items);

  file_put_contents(JSON, $newJson);
?>
