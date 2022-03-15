import "./App.css";
import Preloader from "./components/Preloader";
import EmptyListConfirmationDialog from "./components/EmptyListConfirmationDialog";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import ItemsList from "./components/ItemsList";
import styled from "styled-components";

function App() {
  const Main = styled.main`
    margin-top: 60px;
  `;

  return (
    <div className="App">
      <Preloader />
      <EmptyListConfirmationDialog />

      <section>
        <Header />

        <Main>
          <AddItem />
          <ItemsList />
        </Main>
      </section>
    </div>
  );
}

export default App;
