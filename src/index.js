import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeContextProvider } from './contexts/DarkModeContext'
import { AuthContextProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GameContextProvider } from './contexts/GameContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <GameContextProvider>
      <AuthContextProvider>
        <DarkModeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DarkModeContextProvider>
      </AuthContextProvider>
    </GameContextProvider>
  </QueryClientProvider>
);

reportWebVitals();
