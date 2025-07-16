import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Honeybadger from '@honeybadger-io/js';

Honeybadger.configure({
  apiKey: import.meta.env.VITE_HONEYBADGER_API_KEY,
  environment: import.meta.env.MODE,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
