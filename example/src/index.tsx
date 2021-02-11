import './index.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PluginStoreProvider } from 'react-plugins';

ReactDOM.render(
  <Suspense fallback='Loading...'>
    <PluginStoreProvider>
      <App />
    </PluginStoreProvider>
  </Suspense>,
  document.getElementById('root')
);
