import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from './context/FirebaseContext';
import { ProductContextProvider } from './context/ProductContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductContextProvider>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </ProductContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
