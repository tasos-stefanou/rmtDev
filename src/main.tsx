import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import SearchTextContextProvider from './contexts/SearchTextContextProvider.tsx';
import ActiveIdContextProvider from './contexts/ActiveIdContextProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const newQueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={newQueryClient}>
      <SearchTextContextProvider>
        <ActiveIdContextProvider>
          <App />
        </ActiveIdContextProvider>
      </SearchTextContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
