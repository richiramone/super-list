import './App.css';
import Preloader from './Components/Preloader';
import Header from './Components/Header';
import AddItem from './Components/AddItem';
import ItemsList from './Components/ItemList';
import styled from 'styled-components';

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
