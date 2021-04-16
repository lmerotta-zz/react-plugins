import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ProviderContext } from '../components/PluginStoreProvider';

const usePlugins = (section: string): Array<JSX.Element> => {
  const { store } = useContext(ProviderContext);

  const getPluginElements = useCallback(
    () =>
      store.getPluginsForSection(section).map((component) => {
        if (React.isValidElement(component)) {
          return (component as unknown) as JSX.Element;
        } else {
          const Component = component as React.ComponentType;
          return <Component />;
        }
      }),
    [store, section]
  );

  const [plugins, setPlugins] = useState(getPluginElements());

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setPlugins(getPluginElements());
    });

    return (): void => {
      unsub();
    };
  }, [store]);

  return plugins;
};

export default usePlugins;
