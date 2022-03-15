import "./App.css";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import ItemsList from "./components/ItemsList";
import styled from "styled-components";
import { createContext } from "react";

function App() {
  const Main = styled.main`
    margin-top: 60px;
  `;

  /*
  items: [
    {
      id: 1,
      author: 'lucas',
      item: 'trippe'
    }
  ]
   */
  const localStorageItems = localStorage.getItem("items");
  const items = localStorageItems ? localStorageItems : { items: [] };

  const ListContext = createContext(items);

  return (
    <div className="App">
      <ListContext.Provider value={items}>
        <Preloader />
        <section>
          <Header />
          <Main>
            <AddItem />
            <ItemsList />
          </Main>
        </section>
      </ListContext.Provider>
    </div>
  );
}

export default App;
