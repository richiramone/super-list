import "./App.css";
import Preloader from "./components/Preloader/Preloader";
import Header from "./components/Header/Header";
import AddItem from "./components/AddItem";
import ItemsList from "./components/ItemList/ItemsList";
import styled from "styled-components";

function App() {
  const Main = styled.main`
    margin-top: 60px;
  `;

  return (
    <div className="App">
      <Preloader />
      <section>
        <Header />
        <Main>
          <aside>
            <AddItem />
          </aside>
          <ItemsList />
        </Main>
      </section>
    </div>
  );
}

export default App;
