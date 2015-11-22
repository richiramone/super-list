<?php ob_start();?><!doctype html>
<html lang="it-IT">
<head>
  <title>SuperList</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="SuperList">

  <link href="/img/app-icon/icon.png" rel="apple-touch-icon">
  <link href="/img/startup-images/ipad-retina-portrait.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
  <link href="/img/startup-images/ipad-retina-landscape.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
  <link href="/img/startup-images/iphone-plus-portrait.png" media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image">
  <link href="/img/startup-images/iphone-plus-landscape.png" media="(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image">

  <style><?php echo file_get_contents('css/main.css'); ?></style>

  <link rel="author" href="humans.txt">
  <link rel="shortcut icon" href="favicon.ico">
</head><?php flush(); ob_flush(); ?>
<body>

  <p>Hello world! This is HTML5 Boilerplate.</p>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.4.min.js"><\/script>')</script>

  <script src="js/app.js" async></script>
</body>
</html>
