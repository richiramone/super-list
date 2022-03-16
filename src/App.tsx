import "./App.css";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import ItemsList from "./components/ItemsList";
import styled from "styled-components";
import { ListContextProvider } from "./contexts/ListContext";

function App() {
  const Main = styled.main`
    margin-top: 60px;
  `;

  return (
    <div className="App">
      <ListContextProvider>
        <Preloader />
        <section>
          <Header />
          <Main>
            <AddItem />
            <ItemsList />
          </Main>
        </section>
      </ListContextProvider>
    </div>
  );
}

export default App;
