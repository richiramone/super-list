<?php
  $output = "";
  $i = 0;

  foreach ($items["items"] as $item) {
    $output .= appendContent($item, $i);
    $i++;
  }

  $output .= appendContent(null, $i);

  function appendContent($item, $i) {
    $content = $item["content"] ? $item["content"] : "";
    $placeholder = $item == null ? "altro..." : "";
    $itemStatusClass = $item == null ? 'new' : 'existing';

    $html = "";
    $template = '
    <li class="{{ITEM_STATUS}} item" data-item="{{ID}}" data-item-status="{{ITEM_STATUS}}">
      <input id="item-{{ID}}" type="hidden">
      <h2 data-trigger-item-content>{{CONTENT}}</h2>
      <input type="text" value="{{CONTENT}}" placeholder="{{PLACEHOLDER}}">
    </li>';

    $html .= $template;
    $html = str_replace('{{ITEM_STATUS}}', $itemStatusClass, $html);
    $html = str_replace('{{ID}}', $i, $html);
    $html = str_replace('{{CONTENT}}', $content, $html);
    $html = str_replace('{{PLACEHOLDER}}', $placeholder, $html);

    return $html;
  }
?>
