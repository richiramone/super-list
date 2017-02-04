<?php
    $sql = 'UPDATE items SET name="' . $_GET['content'] . '" WHERE id=' . $_GET['id'] . ';';
    $db->escape_string($sql);
    $db->query('SET CHARACTER SET utf8');
    $db->query($sql);
?>
