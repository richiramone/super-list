import { Suspense } from 'react';
import AddItemForm from './Components/AddItemForm';
import Header from './Components/Header';
import ItemsList from './Components/ItemsList';
import './index.css';

const App: React.FC = () => {
  return (
    <Suspense>
      <template>preloader confirmation dialog</template>
      <Header />

      <main>
        <aside>
          <AddItemForm />
        </aside>

        <ItemsList />
      </main>
    </Suspense>
  );
};

export default App;
