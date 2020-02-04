<?php
    $sql = 'SELECT * FROM items ORDER BY id DESC;';
    $items = $db->query($sql);

    $sender = strtolower($_GET['person']) == 'lucas' ? 'Anna' : 'Lucas';
    $receiver = strtolower($_GET['person']);
    $receiverMail = $receiver == 'lucas' ? MAIL_LUCAS : MAIL_ANNA;

    $content = '<p><strong>Hi ' . ucfirst($receiver) . '!</strong></p><p>Check the changes on your SuperList:</p><ul>';

    while ($item = $items->fetch_assoc()) {
        $content .= '<li>' . $item["name"] . '</li>';
    }
    $content .= '</ul>';

    $subject = ucfirst($sender) . ' has change the SuperList!';

    $headers  = 'MIME-Version: 1.0'."\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8'."\r\n";
    $headers .= 'From: SuperList App<noreply@lucasramos.me>'."\r\n";
    $headers .= 'X-Mailer: PHP/'.phpversion();

    mail($receiverMail, $subject, $content, $headers);
?>
