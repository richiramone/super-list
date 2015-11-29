<?php
  $json = file_get_contents(JSON);
  $items = json_decode($json, true);

  unset($items["items"][$_GET["id"]]);

  $newJson = json_encode($items);
  file_put_contents(JSON, $newJson);
?>
