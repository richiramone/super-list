<?php
    $sql = 'INSERT INTO items (name) VALUES ("' . $_GET['content'] . '");';
    $db->escape_string($sql);
    $db->query('SET CHARACTER SET utf8');
    $db->query($sql);

    $sql = 'SELECT * FROM items ORDER BY id DESC;';
    $items = $db->query($sql);
?>
