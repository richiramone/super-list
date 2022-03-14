

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

      <main data-list-wrapper>
        <aside class="new item" data-item data-item-status="new">
            <input type="text" placeholder="altro...">
        </aside>
        <ul id="items" data-list></ul>
      </main>
  </section>
