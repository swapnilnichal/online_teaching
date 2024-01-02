import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');
const rootContainer = ReactDOM.createRoot(root);
rootContainer.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
