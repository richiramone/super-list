import React from "react";
import "./App.css";

function App() {
    return (
        <div className="App">
            <div className="loading-bg">
                <div className="loading-box">
                    <svg viewBox="0 0 32 32">
                        <use xlink:href="#shape-smiley"></use>
                    </svg>
                </div>
            </div>

            <div className="loading-bg">
                <div className="deleteAll-box">
                <h3>Sei sicuro di voler svuotare la lista?</h3>
                <ol>
                    <li><button data-trigger-confirmation-cancel>No</button></li>
                    <li><button data-trigger-confirmation-confirm>Si</button></li>
                </ol>
                </div>
            </div>

            <section>
                <header className="App-header">
                    <h1>SuperList</h1>
                    <menu>
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
                    <aside className="new item" data-item data-item-status="new">
                        <input type="text" placeholder="altro...">
                    </aside>

                    <ul id="items" data-list></ul>
                </main>
            </section>
        </div>
    );
}

export default App;
