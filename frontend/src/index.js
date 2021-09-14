import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PokemonsProvider from './context/PokemonsContext';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <PokemonsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PokemonsProvider>,
  document.getElementById('root')
);

