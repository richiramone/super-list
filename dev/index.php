<?php ob_start();?><!doctype html>
<html lang="it-IT">
<head>
  <title>SuperList</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="SuperList">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="author" href="humans.txt">
  <link rel="shortcut icon" href="favicon.png">
  <style><?php echo file_get_contents("css/main.css"); ?></style>
</head><?php flush(); ob_flush(); ?>
<body>
  <?php echo file_get_contents('svg/svg-sprite.svg'); ?>
  <p>Hello world! This is HTML5 Boilerplate. 00b4ff</p>

  <svg viewBox="0 0 32 32" class="icon shape-codepen">
    <use xlink:href="#shape-smiley"></use>
  </svg>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.4.min.js"><\/script>')</script>

  <script src="js/app.js" async></script>
</body>
</html>
