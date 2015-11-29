<?php
  $html = '';
  $template = '
  <li{{NEW_ITEM_CLASS}}>
    <input id="item-{{ID}}" type="checkbox">
    <label for="item-{{ID}}"></label>
    <h2>{{CONTENT}}</h2>
    <input type="text" value="{{CONTENT}}"{{CHECKED}}>
    <button>
      <svg viewBox="0 0 32 32">
        <use xlink:href="#shape-trash"></use>
      </svg>
    </button>
  </li>';

  $i = 0;
  foreach ($items["items"] as $item) {
    $html .= $template;
    $html = str_replace('{{NEW_ITEM_CLASS}}', "", $html);
    $html = str_replace('{{ID}}', $i, $html);
    $html = str_replace('{{CONTENT}}', $item["content"], $html);
    $html = str_replace('{{CHECKED}}', $item["checked"] ? " checked" : "", $html);

    $i++;
  }

  $html .= $template;
  $html = str_replace('{{NEW_ITEM_CLASS}}', ' class="newItem"', $html);
  $html = str_replace('{{ID}}', $i, $html);
  $html = str_replace('{{CONTENT}}', "", $html);
  $html = str_replace('{{CHECKED}}', "", $html);
?>
