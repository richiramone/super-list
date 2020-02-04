<?php
    $sql = 'UPDATE items SET name="' . $_GET['content'] . '" WHERE id=' . $_GET['id'] . ';';
    $db->escape_string($sql);
    $db->query($sql);
?>
