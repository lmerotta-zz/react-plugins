import './index.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PluginStore, PluginStoreProvider } from 'react-pluggable';

PluginStore.registerPlugin(
  'body',
  React.lazy(() => import('./plugins/MySecondPluginWithState')),
  'MySecondPluginWithState',
  105
);

PluginStore.registerPlugin(
  'body',
  React.lazy(() => import('./plugins/MyPluginWithState')),
  'MyPluginWithState',
  100
);

// Import the same plugin in two different sections !
PluginStore.registerPlugin(
  'footer',
  React.lazy(() => import('./plugins/MyPluginWithState')),
  'MyPluginWithState',
  101
);

ReactDOM.render(
  <Suspense fallback='Loading...'>
    <PluginStoreProvider>
      <App />
    </PluginStoreProvider>
  </Suspense>,
  document.getElementById('root')
);
