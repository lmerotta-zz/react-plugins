import React from 'react';
import { PluginStore } from 'react-pluggable';

const MyPluginWithState = () => {
  return (
    <p>
      When clicking on this button, it adds a new "MyFooterPlugin" to the footer
      <br />
      <button
        onClick={() => {
          PluginStore.registerPlugin(
            'footer',
            React.lazy(() => import('./MyFooterPlugin')),
            'MyPluginWithState',
            10
          );
        }}
      >
        Add it!
      </button>
    </p>
  );
};

export default MyPluginWithState;
