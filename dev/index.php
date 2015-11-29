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

  <link href="css/main.css" rel="stylesheet">
</head><?php flush(); ob_flush(); ?>
<body class="loading">
  <?php echo file_get_contents('svg/svg-sprite.svg'); ?>

  <div id="loading-bg">
    <div id="loading-box">
      <svg viewBox="0 0 32 32">
        <use xlink:href="#shape-smiley"></use>
      </svg>
    </div>
  </div>

  <section>
    <article>
      <header>
        <h1>SuperList</h1>
        <button class="notify">
          <svg viewBox="0 0 32 32">
            <use xlink:href="#shape-bell"></use>
          </svg>
        </button>
        <button class="reload">
          <svg viewBox="0 0 32 32">
            <use xlink:href="#shape-reload"></use>
          </svg>
        </button>
      </header>

      <main>
        <ol id="items"></ol>
      </main>

      <footer>
        <p>Made with
          <svg viewBox="0 0 32 32">
            <use xlink:href="#shape-heart"></use>
          </svg>
          for Anna &amp; Pancho.</p>
      </footer>
  </section>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.4.min.js"><\/script>')</script>

  <script src="js/app.js" async></script>
</body>
</html>
