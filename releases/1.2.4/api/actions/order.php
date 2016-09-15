<?php
  $json = file_get_contents(JSON);
  $items = json_decode($json, true);

  $tempItems = array();

  foreach ($_GET['itemsOrder'] as $index => $value) {
    $tempItems['items'][] = $items['items'][$value];
  }

  $tempItems['items'] = array_values($tempItems['items']);
  $newJson = json_encode($tempItems);

  if(!file_put_contents(JSON, $newJson)) {
    header('HTTP/1.1 400 Bad request', true, 400);
  }
?>
