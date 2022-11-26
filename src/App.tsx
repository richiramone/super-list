import { Suspense } from 'react';
import Header from './Components/Header';
import './index.css';

const App: React.FC = () => {
  return (
    <Suspense>
      <template>preloader confirmation dialog</template>
      <Header />

      <main>
        <aside>AddItem</aside>
        ItemsList
      </main>
    </Suspense>
  );
};

export default App;
