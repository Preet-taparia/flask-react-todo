import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import client from './KeycloakConfig'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ReactKeycloakProvider authClient={client} initOptions={{onLoad: "login-required"}}>
    <App />
    </ReactKeycloakProvider>
  </>
);
