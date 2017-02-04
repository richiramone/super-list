<?php
    $output = appendContent(null);

    while ($item = $items->fetch_assoc()) {
        $output .= appendContent($item);
    }

    $items->free();

    function appendContent($item) {
        $content = $item["name"] ? $item["name"] : "";
        $placeholder = $item == null ? "altro..." : "";
        $itemStatusClass = $item == null ? 'new' : 'existing';

        $html = "";
        $template = '
    <li class="{{ITEM_STATUS}} item" data-item="{{ID}}" data-item-status="{{ITEM_STATUS}}">
      <input id="item-{{ID}}" type="hidden">
      <h2 data-trigger-item-content>{{CONTENT}}</h2>
      <input type="text" value="{{CONTENT}}" placeholder="{{PLACEHOLDER}}">
      <button data-trigger-delete>
        <svg viewBox="0 0 32 32">
          <use xlink:href="#shape-trash"></use>
        </svg>
      </button>
    </li>';

        $html .= $template;
        $html = str_replace('{{ITEM_STATUS}}', $itemStatusClass, $html);
        $html = str_replace('{{ID}}', $item['id'], $html);
        $html = str_replace('{{CONTENT}}', $content, $html);
        $html = str_replace('{{PLACEHOLDER}}', $placeholder, $html);

        return $html;
    }
?>
