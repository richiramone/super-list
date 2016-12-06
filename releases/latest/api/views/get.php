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
    $itemStatusClass = $item == null ? 'new' : 'existing';
    $draggableAttr = $item == null ? '' : ' draggable="true" ';

    $html = "";
    $template = '
    <div class="{{ITEM_STATUS}} item" data-item="{{ID}}" data-item-status="{{ITEM_STATUS}}">
      <input id="item-{{ID}}" type="hidden">
      <h2 {{ITEM_DRAGGABLE}} data-trigger-item-content>{{CONTENT}}</h2>
      <input type="text" value="{{CONTENT}}">
      <button data-trigger-delete>
        <svg viewBox="0 0 32 32">
          <use xlink:href="#shape-trash"></use>
        </svg>
      </button>
    </div>
    ';

    $html .= $template;
    $html = str_replace('{{ITEM_DRAGGABLE}}', $draggableAttr, $html);
    $html = str_replace('{{ITEM_STATUS}}', $itemStatusClass, $html);
    $html = str_replace('{{ID}}', $i, $html);
    $html = str_replace('{{CONTENT}}', $content, $html);

    return $html;
  }
?>
