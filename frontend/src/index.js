// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './context/AuthContext';  // Import the AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>  {/* Wrap the App with AuthProvider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </AuthProvider>
  </Provider>
);

reportWebVitals();
