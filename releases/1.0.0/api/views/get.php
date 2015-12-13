<?php
  $output = "";
  $i = 0;

  foreach ($items["items"] as $item) {
    $output .= appendContent($item, $i);
    $i++;
  }

  $output .= appendContent(null, $i);

  function appendContent($item, $i) {
    $checked = $item["checked"] == true ? " checked" : "";
    $content = $item["content"] ? $item["content"] : "";
    $itemStatusClass = $item == null ? 'new' : 'existing';

    $html = "";
    $template = '
    <li class="{{ITEM_STATUS}}" data-item="{{ID}}" data-item-status="{{ITEM_STATUS}}">
      <input id="item-{{ID}}" type="checkbox"{{CHECKED}}>
      <label for="item-{{ID}}"></label>
      <h2 data-trigger-item-content>{{CONTENT}}</h2>
      <input type="text" value="{{CONTENT}}">
      <button data-trigger-delete>
        <svg viewBox="0 0 32 32">
          <use xlink:href="#shape-trash"></use>
        </svg>
      </button>
    </li>
    ';

    $html .= $template;
    $html = str_replace('{{ITEM_STATUS}}', $itemStatusClass, $html);
    $html = str_replace('{{ID}}', $i, $html);
    $html = str_replace('{{CONTENT}}', $content, $html);
    $html = str_replace('{{CHECKED}}', $checked, $html);

    return $html;
  }
?>
