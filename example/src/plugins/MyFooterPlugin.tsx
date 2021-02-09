import React, { useEffect, useState } from 'react';
import { PluginStore } from 'react-pluggable';
import MyPluginWithProps from './MyPluginWithProps';

const CHILD_PLUGIN_NAME = 'CHILD_PLUGIN';
const INITIAL_INPUT_TEXT = 'A title coming from the footer!';

const MyFooterPlugin = () => {
  const [inputText, setInputText] = useState(INITIAL_INPUT_TEXT);
  const [showInput, setShowInput] = useState(false);
  const registerPlugin = React.useCallback(
    () =>
      PluginStore.registerPlugin(
        'body',
        <MyPluginWithProps title={inputText} />,
        CHILD_PLUGIN_NAME,
        40
      ),
    [inputText]
  );
  const removePlugin = () => {
    PluginStore.removePlugin('body', CHILD_PLUGIN_NAME);
    setShowInput(false);
    setInputText(INITIAL_INPUT_TEXT);
  };

  useEffect(() => {
    if (showInput) {
      registerPlugin();
    }
  }, [registerPlugin, showInput]);

  return (
    <React.Fragment>
      <p>
        <b>This component has been added dynamically</b>
      </p>
      <p>
        Once you press the button below, another component will be rendered in
        the body of the page, and you'll be able to edit it's contents using the
        input field that will appear
      </p>
      {showInput ? (
        <React.Fragment>
          <input
            type='text'
            value={inputText}
            style={{ width: '100%' }}
            onChange={(e) => setInputText(e.target.value)}
          />
          <br />
          <button onClick={() => removePlugin()}>
            Remove the plugin from the body
          </button>
        </React.Fragment>
      ) : (
        <button onClick={() => setShowInput(true)}>Show input</button>
      )}
    </React.Fragment>
  );
};

export default MyFooterPlugin;
