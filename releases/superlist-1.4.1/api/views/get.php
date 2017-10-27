<?php
    $output = '';

    while ($item = $items->fetch_assoc()) {
        $output .= appendContent($item);
    }

    function appendContent($item) {
        $html = "";
        $template = '
    <li class="existing item" data-item="{{ID}}" data-item-status="existing">
      <input id="item-{{ID}}" type="hidden">
      <h2 data-trigger-item-content>{{CONTENT}}</h2>
      <input type="text" value="{{CONTENT}}">
      <button data-trigger-delete>
        <svg viewBox="0 0 32 32">
          <use xlink:href="#shape-trash"></use>
        </svg>
      </button>
    </li>';

        $html .= $template;
        $html = str_replace('{{ID}}', $item['id'], $html);
        $html = str_replace('{{CONTENT}}', $item["name"], $html);

        return $html;
    }
?>
