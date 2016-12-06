<?php ob_start();?><!doctype html>
<html lang="it-IT" manifest="./manifest.appcache">
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
      <span>Notified!</span>
    </div>

    <div id="person-selector">
      <header>
        <h4>Choose your loved one</h4>
        <button data-trigger-close-modal>X</button>
      </header>

      <menu>
        <li>
          <button data-trigger-person="anna" class="anna">
            <img alt="Notify Lucas" height="50" width="50"
                  src="img/people/anna.png"
                  srcset="img/people/anna@2x.png 2x,
                          img/people/anna@3x.png 3x">
            <p>Anna</p>
          </button>
        </li>
        <li>
          <button data-trigger-person="lucas" class="lucas">
            <img alt="Notify Lucas" height="50" width="50"
                  src="img/people/lucas.png"
                  srcset="img/people/lucas@2x.png 2x,
                          img/people/lucas@3x.png 3x">
            <p>Lucas</p>
          </button>
        </li>
      </menu>
    </div>

    <div id="deleteAll-box">
      <h3>Sei sicuro di voler svuotare la lista?</h3>
      <ol>
        <li><button data-trigger-confirmation-cancel>No</button></li>
        <li><button data-trigger-confirmation-confirm>Si</button></li>
      </ol>
    </div>
  </div>

  <section>
    <article>
      <header class="main-header">
        <h1>SuperList</h1>
        <menu>
          <button data-trigger-notify>
            <svg viewBox="0 0 32 32">
              <use xlink:href="#shape-bell"></use>
            </svg>
          </button>
          <button data-trigger-reload>
            <svg viewBox="0 0 32 32">
              <use xlink:href="#shape-reload"></use>
            </svg>
          </button>
          <button data-trigger-empty>
            <svg viewBox="0 0 32 32">
              <use xlink:href="#shape-trash"></use>
            </svg>
          </button>
        </menu>
      </header>

      <main>
        <ul id="items"></ul>
      </main>
  </section>

  <script src="js/vendor/jquery-2.1.4.min.js"></script>
  <script src="js/app.js" async></script>
</body>
</html>
