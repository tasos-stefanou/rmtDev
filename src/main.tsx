import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import SearchTextContextProvider from './contexts/SearchTextContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchTextContextProvider>
      <App />
    </SearchTextContextProvider>
  </React.StrictMode>
);
