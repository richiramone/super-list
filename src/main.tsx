import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto';
import './styles/styles.css';
import { ThemeProvider } from '@material-tailwind/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
