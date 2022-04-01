import "./App.css";
import Preloader from "./components/Preloader/Preloader";
import Header from "./components/Header/Header";
import AddItem from "./components/AddItem";
import ItemsList from "./components/ItemList/ItemsList";
import styled from "styled-components";

const MainStyles = styled.main`
  margin-top: 60px;
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <Preloader />
      <section>
        <Header />
        <MainStyles>
          <aside>
            <AddItem />
          </aside>
          <ItemsList />
        </MainStyles>
      </section>
    </div>
  );
};

export default App;
