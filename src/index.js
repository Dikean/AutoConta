import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-w1j3tra2.us.auth0.com"
    clientId="in8vha00TxNfLFN1BbvQIOfCHm1h5SiB"
    authorizationParams={{
      redirect_uri: `${window.location.origin}/dashboard`
    }}>
    <App />
  </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();

