// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { UserFlowProvider } from './context/UserFlowContext.jsx'; // <-- Import this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserFlowProvider> {/* <-- Wrap App with this */}
          <App />
        </UserFlowProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
