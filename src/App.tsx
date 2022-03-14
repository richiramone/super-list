import Preloader from "./components/Preloader";
import DeleteAllConfirmationDialog from "./components/DeleteAllConfirmationDialog";
import Header from "./components/Header";
import Item from "./components/Item";
import ItemsList from "./components/ItemsList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Preloader />
      <DeleteAllConfirmationDialog />

      <section>
        <Header />

        <main>
          <Item />
          <ItemsList />
        </main>
      </section>
    </div>
  );
}

export default App;
