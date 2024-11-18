import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import SearchTextContextProvider from './contexts/SearchTextContextProvider.tsx';
import ActiveIdContextProvider from './contexts/ActiveIdContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchTextContextProvider>
      <ActiveIdContextProvider>
        <App />
      </ActiveIdContextProvider>
    </SearchTextContextProvider>
  </React.StrictMode>
);
