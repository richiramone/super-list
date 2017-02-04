<?php
    $whichItem = $_GET["empty"] == true ? '' : 'WHERE id=' . $_GET["id"];
    $sql = 'DELETE FROM items ' . $whichItem . ';';
    $db->escape_string($sql);
    $db->query('SET CHARACTER SET utf8');
    $db->query($sql);
?>
