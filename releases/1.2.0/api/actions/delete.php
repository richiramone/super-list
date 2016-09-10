<?php
  $json = file_get_contents(JSON);
  $items = json_decode($json, true);

  if ($_GET["empty"] == true) {
    $items["items"] = array();
  } else {
    unset($items["items"][$_GET["id"]]);
  }

  $items['items'] = array_values($items['items']);
  $newJson = json_encode($items);

  file_put_contents(JSON, $newJson);
?>
